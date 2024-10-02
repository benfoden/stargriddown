import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      //todo: revert this and allow bots when ready
      {
        userAgent: ["*"],
        disallow: ["/"],
      },
    ],
    // sitemap goes here
  };
}
