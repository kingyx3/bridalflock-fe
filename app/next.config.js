/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Optional: adds a trailing slash to URLs
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'], // Add this line
};

export default nextConfig;
