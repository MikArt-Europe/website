import Navbar from "@/components/navbar";
import styles, {layout} from "@/style";
import {Button} from "@/components/defbutton";
import Footer from "@/components/footer";
import './index.css';

const ComingSoon = () => {
    return (
        <div className='bg-mprimary w-full overflow-hidden'>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                </div>
            </div>

            <div className={`bg-mprimary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section id="dhome" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
                        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                            <div className="flex flex-row justify-between items-center w-full">
                                <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]'>
                                    Is something <br className="sm:block hidden"/>{" "} coming <br
                                    className="sm:block hidden"/>{" "}
                                    <span className="text-gradient">Soon?</span>{" "}
                                </h1>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className={`bg-mprimary ${styles.paddingX} ${styles.flexCenter} mt-[300px]`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

function Home() {
    const messages = ["love", "code", "hax"];
    return (
        <div className='bg-mprimary w-full overflow-hidden'>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                </div>
            </div>

            <div className={`bg-mprimary ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>

                    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
                        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                            <div
                                className="flex flex-row items-center py-[6px] px-4 bg-hero-gradient rounded-[10px] mb-2">
                                <p className={`${styles.paragraph} ml-2`}>
                                    <span className='text-white'>Made</span> with <span
                                    className='text-white'>{messages[Math.floor(Math.random() * messages.length)]}</span> by <span
                                    className='text-gradient'>ArikSquad</span>
                                </p>
                            </div>

                            <div className="flex flex-row justify-between items-center w-full">
                                <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]'>
                                    <p className='ss:text-[62px] text-[42px]'>Modern projects</p>
                                    designed with <br className="sm:block hidden"/>
                                    <span className="text-gradient">care</span> <br className="sm:block hidden"/>
                                </h1>
                            </div>

                            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                                MikArt Europe is designed to be a place where you can find great coding projects.
                            </p>
                        </div>
                    </section>

                </div>
            </div>

            <div className={`bg-mprimary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <section id='' className={layout.section}>
                        <div className={layout.sectionInfo}>
                            <h2 className={styles.heading2}>
                                Jump straight into<p className='text-gradient'>resources</p>
                            </h2>
                            <p className={`${styles.paragraph} max-w-[470px]`}>Lorem ipsum ipsum lorem</p>

                            <button type="button"
                                    className={`py-4 px-6 font-poppins font-medium text-[18px] text-mprimary bg-purple-gradient rounded-[10px] outline-none mt-10`}>
                                <a href="">resources</a></button>
                        </div>
                    </section>

                    <section className={layout.sectionReverse}>
                        <div className={layout.sectionImgReverse}>
                            {/*<Image src="/assets/animvanish.png" alt='card' className='w-[100%] h-[100%]' width={128} height={128}/>*/}
                        </div>

                        <div className={layout.sectionInfo}>
                            <h2 className={styles.heading2}>Try AnimVanish <br className="sm:block hidden"/> in your
                                Minecraft server</h2>
                            <p className={`${styles.paragraph} max-w-[470px]`}>
                                AnimVanish offers a wide range of effects to make your server more fun while in vanish
                                and make enjoyable.
                            </p>
                            <Button styles="mt-10" text='Try it out!'
                                    destination='https://www.spigotmc.org/resources/animvanish-1-19-animated-vanishing.102183/'/>
                        </div>
                    </section>

                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Home;