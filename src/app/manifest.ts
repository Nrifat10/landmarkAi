import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Landmark Inter Gulf LLC",
    short_name: "Landmark Inter Gulf",
    description:
      "Saudi-based integrated services company providing Manpower Supply, Equipment Rental, Industrial Trading, Petro Services and Hospitality Services across the Kingdom.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1f2e",
    theme_color: "#1a1f2e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
