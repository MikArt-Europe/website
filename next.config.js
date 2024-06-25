const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx'
})

module.exports = withNextra({
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
    i18n: {
        locales: ['en-US', 'fi-FI'],
        defaultLocale: 'en-US',
        localeDetection: false,
    }
});
