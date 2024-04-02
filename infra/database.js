import { Client } from "pg";

async function query(QueryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
  await client.connect();

  const response = await client.query(QueryObject);
  await client.end();
  return response;
}

export default {
  query: query,
};
