/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['yt3.ggpht.com', "www.mikart.eu", "mikart.eu"],
    },
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
    },
}

module.exports = nextConfig
