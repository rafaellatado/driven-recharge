import db from "../../database";

export async function findByName(name: string) {
  const result = await db.query("SELECT * FROM carriers WHERE name = $1", [name]);
  return result.rows[0];
}
