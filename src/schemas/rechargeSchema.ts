import joi from "joi";

export const rechargeSchema = joi.object({
  phoneId: joi.number().integer().required(),
  amount: joi.number().min(10).max(1000).required()
});
