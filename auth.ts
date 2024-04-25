import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { dbconnect } from "@/lib/dbconnect";
import { getUserById } from "./actions/data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    secret: "mCdiI4X31LTcgcAI1D2QjK35mYERyV5g35xdp0WT4qk", // Use process.env. 
    adapter: PrismaAdapter(dbconnect),
    session: { strategy: "jwt" },
    ...authConfig,
});

// callbacks: {
//     async session({ token, session }) {
//         if (token.sub && session.user) {
//             session.user.id = token.sub;
//         }
//         return session;
//     },
//     async jwt({ token }) {
//         if (!token.sub) return token;
//         const existingUser = await getUserById(token.sub);
//         if(!existingUser) return token;
//         token.role = existingUser.role;
//         return token;
//     },
// },