import { User } from "@prisma/client"; // Ajuste conforme o tipo de User que você usa no seu projeto

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
