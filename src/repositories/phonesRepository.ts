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


