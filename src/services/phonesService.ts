import { Phone } from "../protocols";
import * as phonesRepository from "../repositories/phonesRepository";
import * as carriersRepository from "../repositories/carriersRepository";
import { conflictError, notFoundError } from "../utils/errorUtils";

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