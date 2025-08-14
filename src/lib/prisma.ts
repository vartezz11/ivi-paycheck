/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

let prisma: any;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient().$extends(withAccelerate());
} else {
  // In development, use a global variable to avoid exhausting connections on hot reload
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient().$extends(withAccelerate());
  }
  prisma = (global as any).prisma;
}

export default prisma;
