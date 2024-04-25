import SignOut from "@/components/auth/SignOut";
import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();

    if(!session) {
        redirect("/logIn")
    }
    return (
        <div>
            <h1>{JSON.stringify(session)}</h1>
            <SignOut/>
        </div>
    );
};

export default page;
