import { query } from "infra/database";
import waitForAllServices from "tests/orchestrator.js";

async function cleanDatabase() {
  await query("drop schema public cascade; create schema public");
}

beforeAll(async () => {
  await waitForAllServices()
  await cleanDatabase()
});

test("check status of /api/v1/migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
