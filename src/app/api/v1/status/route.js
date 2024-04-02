import database from "../../../../../infra/database";
export async function GET() {
  const dbResponse = await database.query("SELECT 1 + 1 as sum;");
  console.log(dbResponse.rows);

  return Response.json({ nome: "Alexandre Rayol" });
}
