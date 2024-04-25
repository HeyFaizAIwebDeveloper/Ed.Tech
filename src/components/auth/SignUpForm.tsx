"use client";

import React, { useState } from "react"; // Import React and useState hook
import { z } from "zod"; // Import zod for schema validation
import { useForm } from "react-hook-form"; // Import useForm hook
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import Link from "next/link";
import Image from "next/image";

import { signUpSchema } from "../../../ValidationSchema"; // Import signUpSchema
import { Checkbox } from "../ui/checkbox";
import { createUser } from "../../../actions/(auth)/signup";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

type SignupData = z.infer<typeof signUpSchema>; // Define SignupData type based on signUpSchema

const SignUpForm = () => {
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility
    const [isLoading, setIsLoading] = useState(false); // State to track loading status of form
    const route = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupData>({
        resolver: zodResolver(signUpSchema),
    });
    const onSubmit = async (data: SignupData) => {
        // Handle signup logic here
        setIsLoading(true);
        try {
            const value = await createUser(data);
            toast({
                variant: "success",
                title: "🚀 Successfully created user",
            });
            reset();
            route.push("/logIn");
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    title: error.message,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "An error occurred while creating the user.",
                });
            }
        }
        setIsLoading(false);
        // Reset the form
    };

    return (
        <main className=" min-h-screen w-full flex justify-center items-center  bg-black p-5">
            <section className=" flex flex-col justify-center items-center  w-full max-w-5xl  md:flex-row gap-5 rounded-2xl bg-white/10 text-white p-5">
                {/* IMAGE CONTAINER  */}
                <div className=" hidden md:flex  w-1/2 justify-center items-center pointer-events-none ">
                    <div className=" relative w-[600px]  h-[600px] object-cover object-center overflow-hidden rounded-xl">
                        <Image
                            src={"/images/signup-img-2.avif"}
                            alt="Sign up image"
                            fill
                            objectFit="cover"
                            objectPosition="center"
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center w-full md:w-1/2 ">
                    <div className=" w-full h-full max-w-80">
                        {/* HEADING CONTAINER */}
                        <div className=" py-5">
                            <h1 className=" capitalize text-purple-500 ">
                                Let's get started
                            </h1>
                            <h2 className="text-2xl font-medium capitalize">
                                Your{" "}
                                <span className="  text-purple-600">
                                    Learning
                                </span>
                                <br /> Make you better
                            </h2>
                        </div>

                        {/* LOGIN WITH OTHER PROVIDERS CONTAINER  */}

                        <div className=" flex gap-5 justify-center items-center">
                            <button className=" flex justify-center items-center gap-1.5 bg-transparent border rounded-md border-gray-600 px-4 py-2 hover:border-purple-600 hover:bg-black/20">
                                <div className=" w-5 h-5">
                                    <Image
                                        src={"/icons/google.png"}
                                        width={25}
                                        height={25}
                                        layout="responsive"
                                        alt="google"
                                    />
                                </div>
                                Google
                            </button>
                            <button className=" flex justify-center items-center gap-1.5 bg-transparent border rounded-md border-gray-600 px-4 py-2 hover:border-purple-600 hover:bg-black/20">
                                <div className=" w-7 h-7">
                                    <Image
                                        src={"/icons/github-1.png"}
                                        width={100}
                                        height={100}
                                        layout="responsive"
                                        alt="google"
                                    />
                                </div>
                                Github
                            </button>
                        </div>

                        {/* DIVIDER CONTAINER  */}
                        <div className=" w-full flex gap-2 items-center my-4 text-gray-600">
                            <hr className=" w-full border rounded-full border-gray-600" />
                            <span>or</span>
                            <hr className=" w-full border rounded-full border-gray-600" />
                        </div>

                        {/* REGISTRATION FORM CONTAINER  */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm mb-1"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full px-3 py-2 rounded-md border  bg-transparent focus:outline-none focus:border-purple-600 focus:bg-black/20 active:bg-black/20 ${
                                        errors.name
                                            ? "border-red-500"
                                            : "border-gray-600"
                                    }`}
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full px-3 py-2 rounded-md border  bg-transparent focus:outline-none focus:border-purple-600 focus:bg-black/20 active:bg-black/20 ${
                                        errors.email
                                            ? "border-red-500"
                                            : "border-gray-600"
                                    }`}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block mb-1 text-sm"
                                >
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"} // Conditionally render password type based on showPassword state
                                    id="password"
                                    className={`w-full px-3 py-2 rounded-md border  bg-transparent focus:outline-none focus:border-purple-600 focus:bg-black/20 active:bg-black/20 ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-gray-600"
                                    }`}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block mb-1 text-sm"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    className={`w-full px-3 py-2 rounded-md border  bg-transparent focus:outline-none focus:border-purple-600 focus:bg-black/20 active:bg-black/20 ${
                                        errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-gray-600"
                                    }`}
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="showPassword"
                                    className="inline-flex items-center "
                                >
                                    <Checkbox
                                        id="showPassword"
                                        className=" w-4 h-4 border-[1px] border-white/25 "
                                        checked={showPassword} // Bind checked attribute to showPassword state
                                        onCheckedChange={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                    <span className="ml-2 text-sm font-light">
                                        Show Password
                                    </span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled= {isLoading}
                                className="w-full flex justify-center items-center cursor-pointer bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-700/80"
                            >
                                {isLoading ? (
                                    <ReloadIcon className=" animate-spin w-5 h-5 font-bold" />
                                ) : (
                                    "Create an account"
                                )}
                            </button>

                            <div className=" py-2.5">
                                <p className=" text-sm font-light ">
                                    Already resigster ?{" "}
                                    <Link
                                        href={"/logIn"}
                                        className=" text-purple-600 transition-all duration-300 ease-in-out hover:underline  underline-offset-4"
                                    >
                                        Log In
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignUpForm;
