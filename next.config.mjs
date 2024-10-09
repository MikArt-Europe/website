import nextra from 'nextra'

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx'
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
