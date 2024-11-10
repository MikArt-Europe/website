import nextra from 'nextra'

const withNextra = nextra({
    latex: true,
    search: {
        codeblocks: false
    },
    contentDirBasePath: '/docs',
    readingTime: true
})

export default withNextra({
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
    redirects: async () => [
        {
            source: '/help-center/:slug*',
            destination: '/docs/:slug*',
            permanent: true,
        },
    ],
});
