import db from "../../database";
import { Phone } from "../protocols";  

export async function findByNumber(number: string) {
  const result = await db.query("SELECT * FROM phones WHERE number = $1", [number]);
  return result.rows[0];
}

export async function countByCpf(cpf: string) {
  const result = await db.query("SELECT COUNT(*) FROM phones WHERE cpf = $1", [cpf]);
  return Number(result.rows[0].count);
}

export async function insert(phone: {
  number: string;
  carrier_id: number;
  name: string;
  description: string;
  cpf: string;
}) {
  const result = await db.query(
    `INSERT INTO phones (number, carrier_id, name, description, cpf)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [phone.number, phone.carrier_id, phone.name, phone.description, phone.cpf]
  );
  return result.rows[0];
}

export async function findAllByCpf(cpf: string) {
  const result = await db.query(`
    SELECT phones.*, carriers.name AS carrier_name, carriers.code AS carrier_code
    FROM phones
    JOIN carriers ON phones.carrier_id = carriers.id
    WHERE phones.cpf = $1
  `, [cpf]);

  return result.rows.map(row => ({
    id: row.id,
    number: row.number,
    name: row.name,
    description: row.description,
    cpf: row.cpf,
    carrier: {
      id: row.carrier_id,
      name: row.carrier_name,
      code: row.carrier_code
    }
  }));
}

export async function findById(id: number) {
  const result = await db.query("SELECT * FROM phones WHERE id = $1", [id]);
  return result.rows[0];
}

export async function findByCpf(cpf: string) {
  const result = await db.query("SELECT * FROM phones WHERE cpf = $1", [cpf]);
  return result.rows;
}
