import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
  exp: number; // Expiration time in seconds
  roleId?: string; // Optional role ID
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("currentUser middleware", req.session?.jwt)
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    console.log("currentUser middleware", payload)
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) {
      return res.status(401).json({ error: 'Token has expired' });
    }
    req.currentUser = payload;
  } catch (err) {}

  next();
};
