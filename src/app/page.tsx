import {
  HomeHero,
  HomeAbout,
  HomeServices,
  HomeStats,
  HomeFeaturedProjects,
  HomeCTA,
} from "@/components/sections/home-sections";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeServices />
      <HomeStats />
      <HomeFeaturedProjects />
      <HomeCTA />
    </>
  );
}
