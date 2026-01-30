/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static export
    images: {
        unoptimized: true, // Required for static export
    },
    // Optional: Configure trailing slashes
    // trailingSlash: true,
};

export default nextConfig;
