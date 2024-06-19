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
        reactCompiler: false,
    },
}

module.exports = nextConfig
