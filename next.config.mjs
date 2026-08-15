/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudflare Pages/Workers doesn't run the Next.js image optimizer,
    // so images are served unoptimized instead.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;
