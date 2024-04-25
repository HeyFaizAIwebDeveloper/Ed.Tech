import React from "react";
import { signOut } from "../../../auth";

const SignOut = () => {
    return (
        <form
            action={async () => {
                "use server";
                await signOut(); // redirect to homepage after logout
            }}
        >
            <button
                type="submit"
                className=" py-2  px-4  rounded-full  bg-purple-700 hover:bg-purple-700/90 transition-all duration-300 ease-in-out"
            >
                Sign Out
            </button>
        </form>
    );
};

export default SignOut;
