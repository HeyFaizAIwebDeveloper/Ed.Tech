import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Sections/Hero";
export default function Home() {
    return (
        <main className=" min-h-screen bg-black text-white">
            <Navbar />
         <Hero/>
        </main>
    );
}
