const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  ...(process.env.PORTFOLIO_EXPORT === "1" ? { output: "export" } : {}),
};

export default nextConfig;
