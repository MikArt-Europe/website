import styles, { layout } from '@/style'
import Footer from '@/components/footer'
import './index.css'
import Image from 'next/image'
import { MainNav } from '@/components/taxomony/main-nav'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const messages = ['love', 'code', 'hax', 'dedication', 'passion']

export const metadata = {
    title: 'MikArt Europe'
}

function Home() {
    const currentMessage = messages[Math.floor(Math.random() * messages.length)]

    return (
        <div className="bg-background w-full overflow-hidden dark">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav
                        items={[
                            {
                                title: 'Home',
                                href: '/#'
                            },
                            {
                                title: 'Docs',
                                href: '/docs'
                            },
                            {
                                title: 'Blogs',
                                href: '/blogs'
                            }
                        ]}
                    />
                    <nav>
                        <Link
                            href="/resources"
                            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}
                        >
                            Resources
                        </Link>
                    </nav>
                </div>
            </header>

            <div className={styles.flexCenter}>
                <div className={`${styles.boxWidth}`}>
                    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
                        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className="flex flex-row items-center py-[6px] px-4 bg-hero-gradient rounded-[10px] mb-2">
                                    <p className={`${styles.paragraph} ml-2`}>
                                        <span className="text-white">Made</span> with{' '}
                                        <span className="text-white">{currentMessage}</span> by{' '}
                                        <span className="text-gradient">ArikSquad</span>
                                    </p>
                                </div>
                                <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] text-center">
                                    <p className="ss:text-[62px] text-[42px]">
                                        Modern projects designed <br className="sm:block hidden" />
                                        with <span className="text-gradient">care</span>
                                        <br className="sm:block hidden" />
                                    </p>
                                </h1>
                                <p className={`${styles.paragraph} max-w-[470px] mt-5 text-center`}>
                                    MikArt Europe is designed to be a place where you can find great coding projects.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <section id="" className={layout.section}>
                        <div className={layout.sectionInfo}>
                            <h2 className={styles.heading2}>
                                Jump straight into <p className="text-gradient">our blogs</p>
                            </h2>
                            <p className={`${styles.paragraph} max-w-[470px]`}>
                                These blogs are written by someone in our project.
                            </p>

                            <Link href="/blogs">
                                <button
                                    type="button"
                                    className={`py-4 px-6 font-poppins font-medium text-[18px] text-secondary bg-purple-gradient rounded-[10px] outline-hidden mt-10`}
                                >
                                    Blogs
                                </button>
                            </Link>
                        </div>
                    </section>

                    <section className={layout.sectionReverse}>
                        <div className={layout.sectionImgReverse}>
                            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                <Image
                                    src={'/assets/animvanish.png'}
                                    alt="card"
                                    className="w-[500px] h-[500px] rounded-3xl"
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        </div>

                        <div className={layout.sectionInfo}>
                            <h2 className={styles.heading2}>
                                Try AnimVanish <br className="sm:block hidden" /> in your Minecraft server
                            </h2>
                            <p className={`${styles.paragraph} max-w-[470px]`}>
                                AnimVanish offers a wide range of effects to make your server more fun while in vanish
                                and make enjoyable.
                            </p>
                            <Link href="https://www.spigotmc.org/resources/animvanish-1-19-animated-vanishing.102183/">
                                <button
                                    type="button"
                                    className={`py-4 px-6 font-poppins font-medium text-[18px] text-secondary bg-blue-gradient rounded-[10px] outline-hidden mt-10`}
                                >
                                    Try it out!
                                </button>
                            </Link>
                        </div>
                        {/* TODO: I love this: <BackgroundBeams />*/}
                    </section>

                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Home
