import joi from 'joi';
import { Phone } from '../protocols/index'

export const phoneSchema = joi.
object<Phone>({
  number: joi.string().pattern(/^\d{11}$/).required(),
  carrier: joi.string().required(),
  name: joi.string().required(),
  description: joi.string().required(),
  cpf: joi.string().pattern(/^\d{11}$/).required()
});

/*  
Não vamos usar .min() ou .max()? Temos um regex doido ali.
*/
