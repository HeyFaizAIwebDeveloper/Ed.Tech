import { z } from "zod";


export const signUpSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    export const logInSchema = z.object({
        email: z.string().email("Email format is incorrect."),
        password: z.string(),
    })