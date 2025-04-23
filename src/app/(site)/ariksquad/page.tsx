import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Mail } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BackgroundGradientAnimation } from '@/components/ui/bg-gradient-anim'

export const metadata = {
    title: 'ArikSquad | Portfolio'
}

const projects = [
    {
        title: 'GroupSecurity',
        description: 'A staff security management system',
        image: '/assets/ariksquad/groupsecurity.png',
        link: 'https://github.com/ariksquad/GroupSecurity',
        technologies: ['Java', 'SQL']
    },
    {
        title: 'EnSave',
        description: 'An all-in-one Discord bot solution, with a website to manage it',
        image: '/assets/ariksquad/ensave.png',
        link: 'https://ensave.mikart.eu',
        technologies: ['Next.js', 'TypeScript', 'Postgres', 'Python']
    },
    {
        title: 'MikArt Resources',
        description: 'A marketplace for my resources',
        image: '',
        link: 'https://github.com/MikArt-Europe/website',
        technologies: ['Next.js', 'Postgres', 'Typescript', 'Stripe'],
        comingSoon: true
    }
]

const stack = [
    { name: 'TypeScript', color: 'border-blue-600' },
    { name: 'React', color: 'border-cyan-500' },
    { name: 'Next.js', color: 'border-black' },
    { name: 'TailwindCSS', color: 'border-sky-400' },
    { name: 'Node.js', color: 'border-green-600' },
    { name: 'Python', color: 'border-yellow-500' },
    { name: 'Java', color: 'border-orange-300' },
    { name: 'Flutter', color: 'border-blue-500' },
    { name: 'Git', color: 'border-red-500' }
]

export default function Page() {
    return (
        <BackgroundGradientAnimation>
            <div className="min-h-screen relative z-50 flex flex-col justify-between">
                <main className="container mx-auto px-4 py-10 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5 lg:sticky lg:top-10 lg:self-start">
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                                            ArikSquad
                                        </span>
                                    </h1>
                                    <p className="mt-4 text-xl text-gray-400">Full-stack developer</p>
                                </div>

                                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-6">
                                    <p className="text-gray-300 leading-relaxed">
                                        I specialize in creating modern web applications with modern tech stack. I have
                                        experience in building web applications with React, Next.js, Node.js, and more.
                                        I am also interested in backend development with Java and C++.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {stack.map((tech) => (
                                            <Badge
                                                key={tech.name}
                                                className={`bg-transparent ${tech.color} border px-3 py-1 text-xs text-gray-300 rounded-full`}
                                            >
                                                {tech.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link
                                        href="https://github.com/ariksquad"
                                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <SiGithub size={20} />
                                        <span className="border-b border-dotted border-transparent group-hover:border-white/50">
                                            GitHub
                                        </span>
                                    </Link>

                                    <Link
                                        href="mailto:ariksquad@mikart.eu"
                                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Mail size={20} />
                                        <span className="border-b border-dotted border-transparent group-hover:border-white/50">
                                            Contact
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <h2 className="text-2xl font-medium text-white mb-6 pb-2 border-b border-white/10">
                                Selected Work
                            </h2>

                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <Card
                                        key={project.title}
                                        className="bg-transparent border-white/10 hover:border-white/30 transition-colors overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                            <div className="md:col-span-2 h-38 md:h-full relative ml-5 rounded-lg">
                                                <div className="w-full h-full overflow-hidden">
                                                    {project.comingSoon ? (
                                                        <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur">
                                                            <p className="text-lg font-medium text-white/90 rotate-[-5deg] border border-white/30 px-5 py-2 rounded bg-black/20 shadow-lg">
                                                                Coming Soon
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            quality={95}
                                                            priority={true}
                                                            className="object-cover transition-transform hover:scale-105 duration-500 rounded-lg shadow-lg"
                                                            placeholder="blur"
                                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmrVfwAG8wLYY3Y7sQAAAABJRU5ErkJggg=="
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <CardContent className="md:col-span-3 p-4 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium text-white">{project.title}</h3>
                                                    <p className="text-sm text-gray-400 mt-1">{project.description}</p>

                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {project.technologies.map((tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant="secondary"
                                                                className="bg-white/5 text-xs"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Link
                                                    href={project.link}
                                                    className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 self-start"
                                                >
                                                    <ExternalLink size={14} />
                                                    <span>View Project</span>
                                                </Link>
                                            </CardContent>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="border-t border-white/10 py-4 text-center text-gray-300 text-sm">
                    &copy; {new Date().getFullYear()} ArikSquad. All rights reserved.
                </footer>
            </div>
        </BackgroundGradientAnimation>
    )
}
