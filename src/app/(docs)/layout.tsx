import { getPageMap } from 'nextra/page-map'
import {Banner} from "nextra/components";
import {Footer, Layout, Navbar} from "nextra-theme-docs";
import 'nextra-theme-docs/style.css'


export default async function RootLayout({ children }: any) {
    return (
        <Layout
            editLink="Edit this page on GitHub"
            docsRepositoryBase="https://github.com/shuding/nextra/blob/core/examples/docs"
            sidebar={{defaultMenuCollapseLevel: 1}}
            banner={<Banner storageKey="Nextra 2">Nextra 4 Alpha</Banner>}
            navbar={<Navbar chatLink="https://discord.gg/hEM84NMkRv" logo={
                <>
                    <span className="_font-extrabold">Nextra</span>
                    <span className="_ms-2 max-md:_hidden _font-normal _text-gray-600">The Next Docs Builder</span>
                </>
            }/>}
            footer={<Footer />}
            pageMap={await getPageMap()}
        >
            {children}
        </Layout>
    );
}