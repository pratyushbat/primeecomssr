/* import {  NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request | any, res:Response, next: NextFunction) {
  const token = req.cookies?.jwtAutToken;
console.log(process.env['API_URL'])
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = jwt.verify(token, process.env['JWT_SECRET'] || "");
  } catch {
    req.user = null;
  }

  next();
} */