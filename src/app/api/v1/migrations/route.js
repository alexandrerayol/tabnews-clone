import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export async function GET(request) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    direction: "up",
    dir: join("infra", "migrations"),
    verbose: true,
  };

  if (request.method === "GET") {
    const migrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: true,
    });

    return Response.json({ migrations });
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    return Response.json({ migrations });
  }

  return new Response("Method Not Allowed", {
    status: 403,
  });
}