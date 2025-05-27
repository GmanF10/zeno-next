import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode (recommended)
  reactStrictMode: true,

  // Future: Enable the app directory (should already be default for v13+)
  experimental: {
    // appDir: true, // usually not needed to specify in v13+
    // Other experimental features if needed
  },

  // Images: Uncomment and edit domains if you use next/image with external hosts
  /*
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      // add your external image domains here
    ],
  },
  */

  // If you use i18n/localization, add it here
  /*
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  */

  // If you need custom webpack tweaks (rare, for advanced users)
  /*
  webpack(config, { isServer }) {
    // Custom webpack tweaks here
    return config;
  },
  */
};

export default nextConfig;
