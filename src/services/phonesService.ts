import { Phone } from "../protocols";
import * as phonesRepository from "../repositories/phonesRepository";
import * as carriersRepository from "../repositories/carriersRepository";
import { conflictError, notFoundError } from "../utils/errorUtils";
import * as rechargesRepository from "../repositories/rechargesRepository";

export async function createPhone(data: Phone) {
  const existingPhone = await phonesRepository.findByNumber(data.number);
  if (existingPhone) throw conflictError("Número já cadastrado");

  const phonesByCpf = await phonesRepository.countByCpf(data.cpf);
  if (phonesByCpf >= 3) throw conflictError("Limite de 3 números por CPF");

  const carrier = await carriersRepository.findByName(data.carrier);
  if (!carrier) throw notFoundError("Operadora não encontrada");

  const phoneToInsert = {
    number: data.number,
    carrier_id: carrier.id,
    name: data.name,
    description: data.description,
    cpf: data.cpf
  };

  return await phonesRepository.insert(phoneToInsert);
}

export async function listPhonesByCpf(cpf: string) {
  return await phonesRepository.findAllByCpf(cpf);
}

export async function getSummaryByCpf(cpf: string) {
  const phones = await phonesRepository.findByCpf(cpf);

  const phonesWithDetails = await Promise.all(
    phones.map(async phone => {
      const carrier = await carriersRepository.findById(phone.carrier_id);
      const recharges = await rechargesRepository.findByPhoneId(phone.id);
      return {
        ...phone,
        carrier,
        recharges
      };
    })
  );

  return {
    document: cpf,
    phones: phonesWithDetails
  };
}

