import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export async function GET() {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient,
    direction: "up",
    dir: join("infra", "migrations"),
    verbose: true,
    migrationsTable: "pgmigrations",
    dryRun: true,
  };

  const pendingMigrations = await migrationRunner({
    ...defaultMigrationOptions,
  });
  await dbClient.end();
  return Response.json(pendingMigrations);
}

export async function POST() {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient,
    direction: "up",
    dir: join("infra", "migrations"),
    verbose: true,
    migrationsTable: "pgmigrations",
    dryRun: true,
  };

  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
  });
  await dbClient.end();

  if (migratedMigrations.length > 0) {
    return new Response(JSON.stringify(migratedMigrations), {
      status: 201,
    });
  }

  return Response.json(migratedMigrations);
}
