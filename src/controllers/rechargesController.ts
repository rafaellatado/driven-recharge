import { Request, Response } from "express";
import * as rechargesService from "../services/rechargesService";

export async function createRecharge(req: Request, res: Response) {
  const { phoneId, amount } = req.body;
  const recharge = await rechargesService.createRecharge({ phoneId, amount });
  res.status(201).send(recharge);
}

export async function getRechargesByNumber(req: Request, res: Response) {
  const number = req.params.number;
  const recharges = await rechargesService.getRechargesByNumber(number);
  res.send(recharges);
}
