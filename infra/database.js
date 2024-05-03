import { Client } from "pg";

export async function query(QueryObject) {
  let client;
  try {
    client = await getNewClient();
    const response = await client.query(QueryObject);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function getNewClient() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

function getSSLValues() {
  return process.env.NODE_ENV === "production" ? true : false;
}
