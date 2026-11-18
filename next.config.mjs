const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: { unoptimized: process.env.PORTFOLIO_EXPORT === "1" },
  ...(process.env.PORTFOLIO_EXPORT === "1" ? { output: "export" } : {}),
};

export default nextConfig;
