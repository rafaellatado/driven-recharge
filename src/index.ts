import express, { Request, Response } from "express";

const app = express();
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("I'm ok!");
});

app.listen(5000, () => console.log(`server is up and running`));

/* Pra que serve a tipagem explícita? Quando devemos usar?
A resposta final é relativa (o famoso “depende”), mas vamos seguir uma regrinha de ouro: 
para valores primitivos em variáveis e funções evitaremos seu uso pois acaba poluindo o código, mas, 
sempre usaremos na assinatura de uma função. Desta forma evitamos tornar o código verboso demais e 
somos assertivos em dar informações relevantes no código. */