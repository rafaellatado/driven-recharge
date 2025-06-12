import * as phonesRepository from "../repositories/phonesRepository";
import * as rechargesRepository from "../repositories/rechargesRepository";
import { notFoundError } from "../utils/errorUtils";

export async function createRecharge(data: { phoneId: number, amount: number }) {
  const phone = await phonesRepository.findById(data.phoneId);
  if (!phone) throw notFoundError("Telefone não encontrado");

  return await rechargesRepository.insert(data.phoneId, data.amount);
}

export async function getRechargesByNumber(number: string) {
  return await rechargesRepository.findByPhoneNumber(number);
}

