import db from "../../database";

export async function insert(phoneId: number, amount: number) {
  const result = await db.query(
    `INSERT INTO recharges (phone_id, amount)
     VALUES ($1, $2)
     RETURNING *`,
    [phoneId, amount]
  );
  return result.rows[0];
}

export async function findByPhoneNumber(number: string) {
  const result = await db.query(`
    SELECT r.id, r.amount, r.created_at
    FROM recharges r
    JOIN phones p ON r.phone_id = p.id
    WHERE p.number = $1
    ORDER BY r.created_at DESC
  `, [number]);

  return result.rows;
}

export async function findByPhoneId(phoneId: number) {
  const result = await db.query("SELECT * FROM recharges WHERE phone_id = $1", [phoneId]);
  return result.rows;
}
