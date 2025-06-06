import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        await connectToDatabase();

        const user = (await User.findOne({ email: credentials.email }).select(
          "+password"
        )) as typeof User & {
          _id: import("mongoose").Types.ObjectId;
          password: string;
          email: string;
          username: string;
          lastname: string;
          middlename: string;
          firstname: string;
          role: import("@/models/User").IUser["role"];
        };

        if (!user) {
          throw new Error("Aucun utilisateur trouvé avec cet email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        // Retourne un objet compatible avec le type User attendu par NextAuth
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          lastname: user.lastname,
          middlename: user.middlename,
          firstname: user.firstname,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if ((user as { id?: string }).id) {
          token.id = (user as { id?: string }).id!;
        }
        token.role = (user as { role?: string }).role;
        token.lastname = (user as { lastname?: string }).lastname;
        token.middlename = (user as { middlename?: string }).middlename;
        token.firstname = (user as { firstname?: string }).firstname;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as AuthToken;
      if (session.user) {
        const u = session.user as AuthSessionUser;
        u.id = t.id;
        u.role = t.role;
        u.lastname = t.lastname;
        u.middlename = t.middlename;
        u.firstname = t.firstname;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Types personnalisés pour enrichir le token et la session
interface AuthToken {
  id?: string;
  role?: string;
  lastname?: string;
  middlename?: string;
  firstname?: string;
  [key: string]: unknown;
}
interface AuthSessionUser {
  id?: string;
  role?: string;
  lastname?: string;
  middlename?: string;
  firstname?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
