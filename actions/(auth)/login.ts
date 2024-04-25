"use server";

import z from "zod";
import { signIn } from "../../auth";
import { logInSchema } from "../../ValidationSchema";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";

type LoginData = z.infer<typeof logInSchema>;

export const login = async (data: LoginData) => {
    const validatedFields = logInSchema.safeParse(data);

    if (!validatedFields.success) {
        throw new Error("Invalid fields!");
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid credentials!");
                default:
                    throw new Error("Something Went Wrong!");
            }
        }
        throw error;
    }
};
