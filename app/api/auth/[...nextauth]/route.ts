import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

// En développement, utiliser une valeur par défaut si NEXTAUTH_SECRET n'est pas défini
const secret =
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV === "development" ? "dev_secret_key_123" : undefined);

if (!secret) {
  throw new Error("NEXTAUTH_SECRET is not defined");
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("Utilisateur non trouvé");
          }

          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );

          if (!isValidPassword) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.username,
            lastname: user.lastname,
            middlename: user.middlename,
            firstname: user.firstname,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.lastname = user.lastname;
        token.middlename = user.middlename;
        token.firstname = user.firstname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email,
          name: token.name,
          lastname: token.lastname,
          middlename: token.middlename,
          firstname: token.firstname,
          role: token.role,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
