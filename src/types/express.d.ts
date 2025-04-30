import { users } from "@prisma/client";

// src/@types/express.d.ts
declare namespace Express {
  interface Request {
    user?: users; 
  }
}
