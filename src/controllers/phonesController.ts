import { Request, Response } from "express";
import * as phonesService from "../services/phonesService";
import { Phone } from "../protocols";

export async function createPhone(req: Request, res: Response) {
  const phoneData: Phone = req.body;
  const createdPhone = await phonesService.createPhone(phoneData);
  res.status(201).send(createdPhone);
}

export async function listPhonesByCpf(req: Request, res: Response) {
  const cpf = req.params.cpf;
  const phones = await phonesService.listPhonesByCpf(cpf);
  res.send(phones); // array vazio se não encontrar
}

export async function getSummaryByCpf(req: Request, res: Response) {
  const { document } = req.params;
  const summary = await phonesService.getSummaryByCpf(document);
  res.send(summary);
}

/* 
PS: req.body precisa ser tipado. 
Vai continuar indicando any, mas precisamos fazer uma asserção 
Ex: req.body as ContactData
Esse ContactData do exemplo precisa estar definido em protocols.
Ex:
type ContactData = {
  fullName: string;
  email?: string,
  phones: string[]
}
*/
