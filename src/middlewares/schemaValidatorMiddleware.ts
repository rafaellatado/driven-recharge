import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      return res.status(422).send(validation.error.details.map(d => d.message));
    }
    next();
  };
}

/*  
Aqui ele importou httpStatus e substituiu o 422 por httpStatus.UNPROCESSABLE_ENTITY
*/
