import { query } from "infra/database";

export default async function Status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;

  const [
    databaseVersionResponse,
    databaseMaxConnectionsResponse,
    databaseOpenedConnectionsResponse,
  ] = await Promise.all([
    query("SHOW server_version;"),
    query("SHOW max_connections;"),
    query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    }),
  ]);

  const versionValue = databaseVersionResponse.rows[0].server_version;
  const maxConnectionsValue = parseInt(
    databaseMaxConnectionsResponse.rows[0].max_connections,
  );
  const openedConnectionsValue =
    databaseOpenedConnectionsResponse.rows[0].count;

  return response.status(200).json({
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
