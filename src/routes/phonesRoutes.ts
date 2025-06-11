import { Router } from "express";
import { createPhone } from "../controllers/phonesController";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import { phoneSchema } from "../schemas/phoneSchema";

const phonesRouter = Router();

phonesRouter.post("/phones", validateSchema(phoneSchema), createPhone);

export default phonesRouter;  
 