import { Router } from "express";
import { createRecharge } from "../controllers/rechargesController";
import { getRechargesByNumber } from "../controllers/rechargesController";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import { rechargeSchema } from "../schemas/rechargeSchema";

const rechargesRouter = Router();

rechargesRouter.post("/recharges", validateSchema(rechargeSchema), createRecharge);
rechargesRouter.get("/recharges/:number", getRechargesByNumber);

export default rechargesRouter;
