import db from "../../database";

export async function findByName(name: string) {
  const result = await db.query("SELECT * FROM carriers WHERE name = $1", [name]);
  return result.rows[0];
}

export async function findById(id: number) {
  const result = await db.query("SELECT * FROM carriers WHERE id = $1", [id]);
  return result.rows[0];
}
