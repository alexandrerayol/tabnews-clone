import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import { getNewClient } from "infra/database";

export default async function Migrations(request, response) {
  const dbClient = await getNewClient();

  const defaultMigrationOptions = {
    dbClient,
    direction: "up",
    dir: join("infra", "migrations"),
    verbose: true,
    migrationsTable: "pgmigrations",
    dryRun: true,
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
    });
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  response.status(405);
}
