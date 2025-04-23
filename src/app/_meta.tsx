export default {
    docs: {
        type: 'doc',
        display: 'children'
    },
    chooser: {
        title: 'Choose project',
        type: 'menu',
        display: 'normal',
        items: {
            mc: {
                title: 'Minecraft',
                href: '/docs/minecraft'
            },
            gs: {
                title: 'GroupSecurity',
                href: '/docs/gs'
            }
        }
    },
    '*': {
        type: 'page',
        display: 'hidden'
    }
}
