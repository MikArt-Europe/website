"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import {ClipboardIcon, DocumentDuplicateIcon} from '@heroicons/react/24/outline';
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark, dracula} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import ReactMarkdown from 'react-markdown';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Footer from "@/components/footer";
import Link from "next/link";
import './resource.css';
import styles from "@/style";

// TODO: add a proper loading screen
// TODO: and switching themes

interface Resource {
    id: string;
    text: string;
    description: string;
    title: string;
    author: {
        id: string;
        username: string;
        role: string;
        image: string;
        createdAt: Date;
        email: string;
    };
    timestamp: Date;
}

export default function Page({params}: { params: { id: string } }) {
    const [copied, setCopied] = useState(false);
    const [blog, setBlog] = useState<Resource>();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/blogs/' + params.id);
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }

        fetchData();
    }, [params.id]);

    if (!blog) {
        return (
            <div className={'dark bg-gray-800 w-full overflow-hidden transition-all duration-500'}>
                <nav className='w-full flex py-6 justify-between items-center navbar'>
                    <Link href="/">
                        <Image src="/assets/logo.png" alt='mikart'
                               className='ml-5 w-[64px] h-[64px] rounded hover:animate-bounce' width={64} height={64}/>
                    </Link>
                </nav>
                Loading...

                <div
                    className={`bg-gray-800 ${styles.paddingX} ${styles.flexCenter} transition-colors duration-500`}>
                    <div className={`${styles.boxWidth} mt-60`}>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
    const text = blog.text.replaceAll('\\n', '\n');

    return (
        <div className={'dark bg-gray-800 w-full overflow-hidden transition-all duration-500'}>
            <nav className='w-full flex py-6 justify-between items-center navbar'>
                <Link href="/">
                    <Image src="/assets/logo.png" alt='mikart'
                           className='ml-5 w-[64px] h-[64px] rounded hover:animate-bounce' width={64} height={64}/>
                </Link>
            </nav>

            <div className={`${styles.paddingX} ${styles.flexCenter} text-red-200 transition-colors duration-500`}
                 style={{marginTop: '20px'}}>
                <div className={`${styles.boxWidth} mt-10 sm:mt-20`}>
                    <div className='flex-col sm:flex-row justify-between items-center w-full'>
                        <div className='flex-col'>
                            <img src={blog.author.image} alt='resource image'
                                 className='w-20 sm:w-40 h-auto rounded-lg mx-auto sm:mx-0 sm:pl-4'/>
                        </div>

                        <div className='flex-col text-center sm:text-left sm:pl-4'>
                            <h1 className='text-2xl sm:text-4xl font-bold'>{blog.author.username}</h1>
                            <h2 className='text-base sm:text-lg'>{blog.timestamp}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`bg-gray-800 text-dimWhite page__link_dark ${styles.flexStart} transition-all duration-500`}>
                <article className={`${styles.boxWidth}`}>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                        <div className="flex-row justify-between items-center w-full">
                            {text ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, emoji]}
                                    components={{
                                        code({node, inline, className, children, ...props}) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <div className='relative mt-5 mb-5'>
                                                    <SyntaxHighlighter
                                                        style={dracula}
                                                        language={match[1]}
                                                        PreTag="div">
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                    <div className='absolute top-0 right-0'>
                                                        <CopyToClipboard text={String(children)}
                                                                         onCopy={() => setCopied(true)}>
                                                            <button className=''>
                                                                {copied ? (
                                                                    <ClipboardIcon className='text-white h-4 w-4'/>
                                                                ) : (
                                                                    <DocumentDuplicateIcon
                                                                        className='text-white h-4 w-4'/>
                                                                )}
                                                            </button>
                                                        </CopyToClipboard>
                                                    </div>
                                                </div>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}>
                                    {text}
                                </ReactMarkdown>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                    </div>
                </article>
            </div>

            <div
                className={`bg-gray-800 ${styles.paddingX} ${styles.flexCenter} transition-colors duration-500`}>
                <div className={`${styles.boxWidth} mt-60`}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}