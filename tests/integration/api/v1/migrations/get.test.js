import { query } from "infra/database";

async function cleanDatabase() {
  await query("drop schema public cascade; create schema public");
}

beforeAll(cleanDatabase);

test("check status of /api/v1/migrations", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations");
  const responseBody1 = await response1.json();

  expect(response1.status).toBe(200);
  expect(Array.isArray(responseBody1)).toBe(true);
  expect(responseBody1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations");
  const responseBody2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(responseBody2.length).toBeGreaterThan(0);
});
