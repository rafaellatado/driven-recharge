import express, { Request, Response, json } from "express";
import phonesRouter from "./src/routes/phonesRoutes";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandlerMiddleware";
import rechargesRouter from "./src/routes/rechargesRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json()); // parser

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("I'm ok!");
});

app.use(phonesRouter)
app.use(errorHandlerMiddleware);
app.use(phonesRouter);
app.use(rechargesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));


/* Pra que serve a tipagem explícita? Quando devemos usar?
A resposta final é relativa (o famoso “depende”), mas vamos seguir uma regrinha de ouro: 
para valores primitivos em variáveis e funções evitaremos seu uso pois acaba poluindo o código, mas, 
sempre usaremos na assinatura de uma função. Desta forma evitamos tornar o código verboso demais e 
somos assertivos em dar informações relevantes no código. */