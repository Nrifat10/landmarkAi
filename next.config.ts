import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // Don't ignore TS errors — was previously true, which masked real bugs in production.
  // If a TS error exists, fix it instead of suppressing.
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: "/services/trading",
        destination: "/services/industrial",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Security headers — applied to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Clickjacking protection — site can't be embedded in iframes
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // MIME-type sniffing protection
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer policy — send origin only to same site, full URL otherwise
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable camera/microphone/geolocation for the site
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Content Security Policy — allow inline scripts/styles (Next.js needs),
          // images from self + data: + https: (Google Maps embed etc.),
          // connect-src to self + https://splitforms.com (legacy, harmless if unused),
          // frame-src for Google Maps embed
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://splitforms.com",
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          // HSTS — force HTTPS for 1 year, include subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      // Admin routes get extra-strict noindex headers
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      // Public API endpoint gets noindex
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
