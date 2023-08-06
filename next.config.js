/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  cssModules: true,
  cssModules: {
    mode: "global",
    auto: true,
    exportGlobals: true,
  },
};

module.exports = nextConfig;
