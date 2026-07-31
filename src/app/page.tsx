import { Contact } from "@/components/contact";
import { Credentials } from "@/components/credentials";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Statement } from "@/components/statement";
import { Work } from "@/components/work";
import { ScrollProgress } from "@/components/ui";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Work />
        <Expertise />
        <Experience />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}
