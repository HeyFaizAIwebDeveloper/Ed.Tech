"use server";

import * as z from "zod";
import { dbconnect } from "@/lib/dbconnect";
import { signUpSchema } from "../../ValidationSchema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user";

type SignupData = z.infer<typeof signUpSchema>;
export const createUser = async (data: SignupData) => {
    const validatedFields = signUpSchema.safeParse(data);

    if (validatedFields.success) {
        const { name, email, password } = validatedFields.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser =  await getUserByEmail(email)

        if (existingUser) {
            
            throw new Error("Email already exists");
        }

        const newUser = await dbconnect.user.create({
            data: { name, email, password: hashedPassword },
        });
        return newUser;
    }
};
