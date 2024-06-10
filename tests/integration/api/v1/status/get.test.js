import waitForAllServices from "tests/orchestrator.js";

beforeAll(async () => {
  await waitForAllServices()
})

test("check status of /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(response.status).toBe(200); //http status "ok"
  expect(responseBody.updated_at).toBeDefined(); //not undefined

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(expect.any(String)); //is string
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); //valid time string

  expect(responseBody.dependencies).toBeDefined();
  expect(responseBody.dependencies.database).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(
    expect.any(Number),
  );
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
