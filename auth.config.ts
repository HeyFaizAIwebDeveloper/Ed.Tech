import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { logInSchema } from "./ValidationSchema";
import { getUserByEmail } from "./actions/data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validationFields = logInSchema.safeParse(credentials);

                if (validationFields.success) {
                    const { email, password } = validationFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null; // No User Found or Password not set

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    ); //  Checking if the entered password matches with hashed

                    if (passwordsMatch) {
                        return user;
                    } else throw new Error("Invalid Password"); 
                }

                return null
            },
        }),
    ],
} satisfies NextAuthConfig;
