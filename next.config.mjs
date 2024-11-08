import nextra from 'nextra'

const withNextra = nextra({
    latex: true,
    search: {
        codeblocks: false
    },
    contentDirBasePath: '/docs',
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
});
