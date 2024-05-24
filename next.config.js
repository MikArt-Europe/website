/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '"www.mikart.eu',
                pathname: '**',
            },
        ],
    },
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
    },
}

module.exports = nextConfig
