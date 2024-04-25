import { cn } from "@/lib/utils";
import React from "react";

const Hero = () => {
    return (
        <main className={cn("min-h-screen  flex justify-center items-center text-white ", 
            
        )}>
            <section className=" flex flex-col justify-center gap-5 items-center">
                <h1 className=" text-5xl  font-medium   text-center  leading-normal">
                    {/* Stop Learning, Start Doing <br /> */}
                    Sharpen Your {" "}
                    <span className="py-0.5 px-3 bg-white text-black rounded-full">
                        Skills
                    </span> {" "}
                    <br />
                    with Real-World {" "}
                    <span className="py-0.5 px-3 bg-white text-black rounded-full">
                        Challenges
                    </span>
                </h1>
                <p className=" max-w-2xl  text-center font-light">
                    Forget boring lessons! Learn by doing with real-life
                    problems. They&apos;ll boost your skills faster and turn everyday
                    struggles into stepping stones to success. <br />
                    Join us and see results quicker!
                </p>
                <button className=" border p-2.5 rounded-full">explore now </button>
            </section>
        </main>
    );
};

export default Hero;
