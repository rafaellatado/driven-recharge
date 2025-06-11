import { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.type === "conflict") return res.status(409).send(err.message);
  console.error(err);
  res.status(500).send("Internal Server Error");
}
