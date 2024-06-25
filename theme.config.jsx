import {useRouter} from "next/navigation";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    logo: <span>MikArt Europe</span>,
    docsRepositoryBase: 'https://github.com/mikart-europe/website/tree/master',
    project: {
        link: 'https://github.com/mikart-europe/website'
    },
    i18n: [
        { locale: 'en-US', text: 'English' },
        { locale: 'fi-FI', text: 'Suomeksi' }
    ],
    // ... other theme options
    useNextSeoProps() {
        const { asPath } = useRouter()
        if (asPath !== '/') {
            return {
                titleTemplate: '%s – Help Center'
            }
        }
    },
    primaryHue: 0x9e1e1e,
}