import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Credentials } from "@/components/credentials";
import { Dashboards } from "@/components/dashboards";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PlatformBand } from "@/components/platform-band";
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
        <PlatformBand />
        <Statement />
        <Work />
        <Dashboards />
        <Expertise />
        <Experience />
        <Credentials />
        <About />
        <Contact />
      </main>
    </>
  );
}
