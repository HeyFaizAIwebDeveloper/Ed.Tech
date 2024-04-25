import { dbconnect } from "@/lib/dbconnect";

export const getUserByEmail = async (email: any) => {
    try {
        const user = await dbconnect.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        throw new Error("Failed to get user");
    }
};

export const getUserById = async (id:any) =>{
    try {
        const user = await dbconnect.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    } catch (error) {
        throw new Error("Failed to get user");
    }
}