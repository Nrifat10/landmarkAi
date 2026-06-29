import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { VisionMissionValues } from "@/components/sections/vision-mission-values";
import { BusinessEthics } from "@/components/sections/business-ethics";
import { Manpower } from "@/components/sections/manpower";
import { Equipment } from "@/components/sections/equipment";
import { Transport } from "@/components/sections/transport";
import { Hospitality } from "@/components/sections/hospitality";
import { PetroServices } from "@/components/sections/petro-services";
import { Projects } from "@/components/sections/projects";
import { CeoMessage } from "@/components/sections/ceo-message";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <VisionMissionValues />
        <BusinessEthics />
        <Manpower />
        <Equipment />
        <Transport />
        <Hospitality />
        <PetroServices />
        <Projects />
        <CeoMessage />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
