import NextAuth from "next-auth";
import { Role } from "@/lib/client";

declare module "next-auth" {
  interface Session {
    role: Role;
  }
}