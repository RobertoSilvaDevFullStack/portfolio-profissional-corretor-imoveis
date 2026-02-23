import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Regions } from "@/components/sections/Regions";
import { Pillars } from "@/components/sections/Pillars";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
        <Regions />
        <Pillars />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
