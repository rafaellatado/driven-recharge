import { Request, Response } from "express";
import * as phonesService from "../services/phonesService";
import { Phone } from "../protocols";

export async function createPhone(req: Request, res: Response) {
  const phoneData: Phone = req.body;
  const createdPhone = await phonesService.createPhone(phoneData);
  res.status(201).send(createdPhone);
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
