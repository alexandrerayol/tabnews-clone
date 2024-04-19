import database from "infra/database";

export async function GET() {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;
  const [
    databaseVersionResponse,
    databaseMaxConnectionsResponse,
    databaseOpenedConnectionsResponse,
  ] = await Promise.all([
    database.query("SHOW server_version;"),
    database.query("SHOW max_connections;"),
    database.query(
      `SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`,
    ),
  ]);

  const versionValue = databaseVersionResponse.rows[0].server_version;
  const maxConnectionsValue = parseInt(
    databaseMaxConnectionsResponse.rows[0].max_connections,
  );
  const openedConnectionsValue =
    databaseOpenedConnectionsResponse.rows[0].count;

  return Response.json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionValue,
        max_connections: maxConnectionsValue,
        opened_connections: openedConnectionsValue,
      },
    },
  });
}
