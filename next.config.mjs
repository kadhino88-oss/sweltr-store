/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Keep remote image loading limited to the supplier CDNs actually used by the catalogue.
    remotePatterns: [
      { protocol: "https", hostname: "cf.cjdropshipping.com" },
      { protocol: "https", hostname: "oss-cf.cjdropshipping.com" },
      { protocol: "https", hostname: "oss.cjdropshipping.com" },
      { protocol: "https", hostname: "cc-west-usa.oss-accelerate.aliyuncs.com" },
    ],
  },
};
export default nextConfig;
