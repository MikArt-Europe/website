"use client";
import Image from 'next/image'
import styles from "@/style";

const footer = [
    {
        title: "Services",
        links: [
            {
                name: "EnSave",
                link: "https://www.mikart.eu/content/ensave",
            },
            {
                name: "AnimVanish",
                link: "https://www.mikart.eu/content/animvanish",
            },
            {
                name: "GroupSecurity",
                link: "https://www.mikart.eu/content/neverlaksyt",
            },
            {
                name: "TOS",
                link: "https://www.mikart.eu/terms-of-service/",
            },
        ],
    },
    {
        title: "Community",
        links: [
            {
                name: "Help Center",
                link: "https://www.mikart.eu/help-center/",
            },
            {
                name: "Blogs",
                link: "https://www.mikart.eu/blogs/",
            }
        ],
    },
    {
        title: "New Stuff",
        links: [
            {
                name: "YouTube",
                link: "https://www.youtube.com/@ArikSquad",
            },
        ],
    },
];

const social_medias = [
    {
        id: "social-media-1",
        icon: "/assets/twitter.svg",
        link: "https://www.twitter.com/MCArikSquad",
    },
    {
        id: 'social-media-2',
        icon: "/assets/youtube.png",
        link: 'https://www.youtube.com/@ArikSquad'
    }
];


export default function Footer () {
    return (
        <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
            <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
                <div className="flex-[1] flex flex-col justify-start mr-10">
                    <Image
                        src="/assets/logo.png"
                        alt="mikart"
                        className="w-[266px] h-[72.14px] object-contain"
                        width={266} height={72.14}
                    />
                    <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
                        MikArt Europe is designed to be a place where you can find the best Minecraft modifications there is.
                    </p>
                </div>

                <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
                    {footer.map((_footer) => (
                        <div key={_footer.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                                {_footer.title}
                            </h4>
                            <ul className="list-none mt-4">
                                {_footer.links.map((link, index) => (
                                    <li
                                        key={link.name}
                                        className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                                            index !== _footer.links.length - 1 ? "mb-4" : "mb-0"
                                        }`}
                                    >
                                        <a href={link.link}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
                <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
                    Copyright Ⓒ 2022-2024 MikArt Europe. All Rights Reserved.
                </p>

                <div className="flex flex-row md:mt-0 mt-6">
                    {social_medias.map((social, index) => (
                        <Image
                            key={social.id}
                            src={social.icon}
                            alt={social.id}
                            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                                index !== social_medias.length - 1 ? "mr-6" : "mr-0"
                            }`}
                            width={21} height={21}
                            onClick={() => window.open(social.link)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}