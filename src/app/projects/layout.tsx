import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Major EPC Project Deployment Record in Saudi Arabia",
  description:
    "Explore Landmark Inter Gulf's project experience — 16+ major projects, 4,500+ personnel deployed for SINOPEC, Hyundai E&C, SEPCO Arabia, L&T Arabia, Midong E&C and more across Jafurah, Marjan, Jubail and Yanbu.",
  alternates: { canonical: "https://www.landmarkgulf.com/projects" },
  openGraph: {
    title: "Project Experience — Landmark Inter Gulf LLC",
    description:
      "Trusted by leading EPC contractors across Saudi Arabia. 16+ major projects, 4,500+ personnel deployed since 2017.",
    url: "https://www.landmarkgulf.com/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
