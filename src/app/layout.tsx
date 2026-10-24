import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { ScrollUtilities } from "@/components/sections/scroll-utilities";
import { company, siteSeo } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.landmarkgulf.com"),
  title: {
    default: siteSeo.title,
    template: "%s | Landmark Inter Gulf LLC",
  },
  description: siteSeo.description,
  keywords: siteSeo.keywords,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  applicationName: company.name,
  category: "Business Services",
  alternates: {
    canonical: "https://www.landmarkgulf.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteSeo.title,
    description: siteSeo.description,
    url: "https://www.landmarkgulf.com",
    siteName: company.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSeo.title,
    description: siteSeo.description,
    images: ["/images/hero-1.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    telephone: false,

    address: true,
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: ["Landmark Inter Gulf", "Landmark Gulf", "Landmark Inter Gulf LLC", "Landmark"],
  url: "https://www.landmarkgulf.com",
  logo: "https://www.landmarkgulf.com/landmark-logo-light.png",
  image: "https://www.landmarkgulf.com/og-image.png",
  description: siteSeo.description,
  foundingDate: "2017",
  founder: { "@type": "Person", name: company.ceo },
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "Eastern Province",
    addressLocality: "Al Jubail",
    postalCode: "35712",
    streetAddress: "King Faisal W, King Fahd Industrial Port, Al Jubail 35712",
  },
  areaServed: "Kingdom of Saudi Arabia",
  slogan: company.tagline,
  knowsAbout: [
    "Manpower Supply",
    "Equipment Rental",
    "Industrial Trading",
    "Petro Services",
    "Hospitality Services",
    "Car Rental & Transport",
    "Construction",
    "Oil and Gas",
    "Saudi Vision 2030",
  ],
  sameAs: [
    "https://maps.app.goo.gl/Hi6Fimz27BaCCq7x8",
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.name,
  alternateName: ["Landmark Gulf", "Landmark Inter Gulf"],
  url: "https://www.landmarkgulf.com",
  description: siteSeo.description,
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.landmarkgulf.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.landmarkgulf.com/#business",
  name: company.name,
  alternateName: "Landmark Inter Gulf Co. L.L.C",
  description: siteSeo.description,
  url: "https://www.landmarkgulf.com",
  image: "https://www.landmarkgulf.com/og-image.png",
  logo: "https://www.landmarkgulf.com/landmark-logo-light.png",
  priceRange: "$$",
  hasMap: "https://maps.app.goo.gl/Hi6Fimz27BaCCq7x8",
  map: "https://www.google.com/maps?q=Landmark+Inter+Gulf+Co+L.L.C+Jubail&output=embed",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "Eastern Province",
    addressLocality: "Al Jubail",
    postalCode: "35712",
    streetAddress: "King Faisal W, King Fahd Industrial Port, Al Jubail 35712",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.9414,
    longitude: 49.6525,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "07:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "00:00",
      closes: "00:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Riyadh" },
    { "@type": "City", name: "Jubail" },
    { "@type": "City", name: "Yanbu" },
    { "@type": "City", name: "Jafurah" },
    { "@type": "City", name: "Marjan" },
    { "@type": "City", name: "Dammam" },
    { "@type": "City", name: "Khobar" },
  ],
  sameAs: [
    "https://maps.app.goo.gl/Hi6Fimz27BaCCq7x8",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <ScrollUtilities />
        <Toaster />
      </body>
    </html>
  );
}
