export default {
    docs: {
        type: 'doc',
        display: 'children'
    },
    chooser: {
        title: 'Choose project',
        type: 'menu',
        items: {
            mc: {
                title: 'Minecraft',
                href: '/docs/mc'
            },
            gs: {
                title: 'GroupSecurity',
                href: '/docs/gs'
            }
        }
    },
    '*': {
        title: ' ',
        type: 'page'
    },
}
