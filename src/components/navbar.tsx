"use client";
import Image from 'next/image'
import {useState} from "react";
import { XMarkIcon, Bars3BottomRightIcon } from '@heroicons/react/24/outline';

export const navigation: {
    id: string;
    title: string;
}[] = [
    {
        id: "#home",
        title: "Home",
    },
    {
        id: "#onechannel",
        title: "OneChannel",
    },
    {
        id: "#neverlaksyt",
        title: "NeverLäksyt",
    },
    {
        id: "/blogs",
        title: "Blogs",
    },
];

export default function Navbar () {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);
    return (
        <nav className='w-full flex py-6 justify-between items-center navbar'>
            <Image src="/assets/logo.png" alt='mikart' className='ml-5 w-[64px] h-[64px] rounded hover:animate-bounce' width={64} height={64}/>

            <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
                {navigation.map((nav, index) => (
                    <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"} ${index === navigation.length - 1 ? "mr-2" : "mr-10"}`} onClick={() => setActive(nav.title)}>
                        <a href={`${nav.id}`}>{nav.title}</a>
                    </li>
                ))}
            </ul>

            <div className='sm:hidden flex flex-1 justify-end items-center'>
                {toggle ? <XMarkIcon className='w-[28px] h-[28px] object-contain mr-2 text-white transition ease-in-out delay-150' onClick={() => setToggle(!toggle)}/> : <Bars3BottomRightIcon className='w-[28px] h-[28px] object-contain mr-2 text-white transition ease-in-out delay-150' onClick={() => setToggle(!toggle)}/> }

                <div className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                    <ul className='list-none flex justify-end items-start flex-1 flex-col'>
                        <li key="#home" className={`font-poppins font-medium cursor-pointer text-[16px] ${active === "Home" ? "text-white" : "text-dimWhite"} ${0 === navigation.length - 1 ? "mb-0" : "mb-4"}`} onClick={() => setActive("Home")}>
                            <a href="#">Home</a>
                        </li>
                        <li key="#home" className={`font-poppins font-medium cursor-pointer text-[16px] ${active === "OneChannel" ? "text-white" : "text-dimWhite"} ${1 === navigation.length - 1 ? "mb-0" : "mb-4"}`} onClick={() => setActive("OneChannel")}>
                            <a href="#">OneChannel</a>
                        </li>
                        <li key="#home" className={`font-poppins font-medium cursor-pointer text-[16px] ${active === "NeverLäksyt" ? "text-white" : "text-dimWhite"} ${2 === navigation.length - 1 ? "mb-0" : "mb-4"}`} onClick={() => setActive("NeverLäksyt")}>
                            <a href="#">NeverLäksyt</a>
                        </li>
                        <li key="/resources" className={`font-poppins font-medium cursor-pointer text-[16px] ${active === "Resources" ? "text-white" : "text-dimWhite"} ${3 === navigation.length - 1 ? "mb-0" : "mb-4"}`} onClick={() => setActive("Resources")}>
                            <a href="/resources">Resources</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}