// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
  try {
    await import("./src/env.js");
  } catch (error) {
    // Skip env validation if the module is not found (e.g., in some build environments)
    // but still throw other errors
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ERR_MODULE_NOT_FOUND"
    ) {
      console.warn("Warning: env.js not found, skipping environment validation");
    } else {
      throw error;
    }
  }
}

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  // Use webpack instead of Turbopack for compatibility with custom webpack config
  turbopack: {},
  webpack: (config, context) => {
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        }),
      );
    }

    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};

export default config;
