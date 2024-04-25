"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const Navbar = () => {
    const links = [
        { href: "/", label: "Home" },
        { href: "/", label: "Course" },
        { href: "/", label: "Sponsorship" },
        { href: "/", label: "FAQ's" },
        { href: "/", label: "About" },
    ];

    const [isOpen, setIsOpen] = useState(false);

    function handleMenuToggle() {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    return (
        <nav className="relative h-16 ">
            <div className=" w-full max-w-5xl fixed  top-1  transform left-1/2 -translate-x-1/2 h-16 flex justify-between items-center mx-auto  px-4  bg-slate-100/5 rounded-full backdrop-blur-sm">
                {/* LOGO CONTAINER  */}
                <Link href={"/"}>
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        width={100}
                        height={100}
                        priority={true}
                        className=" h-auto w-auto"
                    />
                </Link>

                {/* BIG SCREEN NAVBAR  */}
                {/* NAVIGATIONS LINKS  */}
                <ul className=" hidden md:flex gap-1 items-center">
                    {links.map(({ href, label }, index) => (
                        <li key={index}>
                            <Link
                                href={href}
                                className=" py-2  px-4 text-base rounded-full capitalize hover:bg-white/10 transition-all duration-300 ease-in-out"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* LOGIN BUTTON  */}
                <div className=" hidden md:block">
                    <Link
                        href={"/logIn"}
                        className=" py-2  px-4  rounded-full border border-purple-700 bg-black/20 hover:bg-purple-600 transition-all duration-300 ease-in-out"
                    >
                        Login
                    </Link>
                </div>

                {/* MOBILE MENU  */}
                <button
                    className=" block md:hidden hover:bg-white/10 p-2 rounded-full"
                    onClick={handleMenuToggle}
                >
                    <HamburgerMenuIcon className=" text-purple-700 w-6 h-6" />
                </button>

                <div
                    className={`fixed md:hidden top-0 left-0 w-full  min-h-screen  bg-black z-60 overflow-auto transition duration-300 ease-in-out transform ${
                        isOpen ? "-translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {/* LOGO AND NAVBAR BUTTON  */}
                    <div className=" flex justify-between items-center h-16 mx-auto  px-4">
                        <Link href={"/"}>
                            <Image
                                src={"/logo.svg"}
                                alt="logo"
                                width={100}
                                height={100}
                                priority={true}
                                className=" h-auto w-auto"
                            />
                        </Link>

                        <button
                            className=" block md:hidden hover:bg-black/10 p-2 rounded-full"
                            onClick={handleMenuToggle}
                        >
                            <Cross2Icon className=" text-purple-700 w-6 h-6" />
                        </button>
                    </div>

                    {/* NAVIGATION  LINKS FOR MOBILE GO HERE  */}
                    <ul className=" space-y-2 pl-2.5 pt-5">
                        {links.map(({ href, label }, index) => (
                            <li key={index}>
                                <Link
                                    href={href}
                                    className=" py-2 px-4 text-lg  rounded-full capitalize hover:bg-black/10 transition-all duration-300 ease-in-out"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li className="ml-2.5 pt-2.5">
                            <Link
                                href={"/logIn"}
                                className=" py-2  px-4  rounded-full  bg-purple-700 hover:bg-purple-700/90 transition-all duration-300 ease-in-out"
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
function asyn() {
    throw new Error("Function not implemented.");
}
