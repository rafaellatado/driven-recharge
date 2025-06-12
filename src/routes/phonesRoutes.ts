import { Router } from "express";
import { createPhone, listPhonesByCpf } from "../controllers/phonesController";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import { phoneSchema } from "../schemas/phoneSchema";
import { createRecharge } from "../controllers/rechargesController";
import { rechargeSchema } from "../schemas/rechargeSchema";
import { getSummaryByCpf } from "../controllers/phonesController";

const phonesRouter = Router();

phonesRouter.post("/phones", validateSchema(phoneSchema), createPhone);
phonesRouter.get("/phones/:cpf", listPhonesByCpf);
phonesRouter.post("/recharges", validateSchema(rechargeSchema), createRecharge);
phonesRouter.get("/summary/:document", getSummaryByCpf);



export default phonesRouter;  
 