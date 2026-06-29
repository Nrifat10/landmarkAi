import {
  HomeHero,
  HomeAbout,
  HomeServices,
  HomeStats,
  HomeFeaturedProjects,
  HomeCTA,
} from "@/components/sections/home-sections";
import { ClientLogos } from "@/components/sections/client-logos";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeServices />
      <HomeStats />
      <ClientLogos />
      <HomeFeaturedProjects />
      <HomeCTA />
    </>
  );
}
