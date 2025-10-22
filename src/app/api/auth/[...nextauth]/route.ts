import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/client";
import bcrypt from "bcrypt";

/* We define authOptions as a separate constant and export it, 
 * so it can be used as an argument for other functions that require it (e.g. getServerSession)
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Properties "name" and "credentials" define what we see on the /api/auth/signin page
      name: "e-mail address and password",
      credentials: {
        email: {
          label: "E-mail address",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      /* Function below captures the credentials from the fields defined above and checks if they are valid.
       * If not, return null -> this will show an error on the log-in page. If valid, return a user object. */
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordsMatch ? user : null;
      },
    }),
  ],
  // This defines that we use a JWT instead of a database to capture session data
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
