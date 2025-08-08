import styles, { layout } from '@/style'
import Footer from '@/components/footer'
import './index.css'
import Image from 'next/image'
import { MainNav } from '@/components/taxomony/main-nav'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Shield, Bot, Zap, Users, Star, ExternalLink } from 'lucide-react'
import { mainNavItems } from '@/lib/navigation'

const messages = ['love', 'code', 'hax', 'dedication', 'passion', 'innovation']

export const metadata = {
    title: 'MikArt Europe'
}

function Home() {
    const currentMessage = messages[Math.floor(Math.random() * messages.length)]

    return (
        <div className="bg-background w-full overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-xl border-b border-border/10 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80" />
                <div className="container relative z-10">
                    <div className="flex h-20 items-center justify-between py-6">
                        <MainNav items={mainNavItems} />
                    </div>
                </div>
            </header>

            <div className="pt-20">
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

                    <div className="container relative z-10">
                        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                            <Badge variant="outline" className="px-4 py-2 text-sm bg-background/50 backdrop-blur-sm">
                                <Zap className="h-4 w-4 mr-2" />
                                Made with <span className="text-primary font-semibold mx-1">{currentMessage}</span> by ArikSquad
                            </Badge>

                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                                Modern Gaming
                                <br />
                                <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
                                    Solutions
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                Discover innovative Minecraft modifications, powerful Discord bots, and cutting-edge security solutions
                                designed to enhance your gaming experience.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <Link href="/docs" className={cn(buttonVariants({ size: "lg" }), "group")}>
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/blog" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                                    Read Our Blog
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-8 border-t border-border/50 w-full"></div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-muted/30">
                    <div className="container">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4">Our Products</Badge>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Powerful Tools for Modern Gaming
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                                From Minecraft plugins to Discord bots, we create solutions that enhance your gaming community.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                                <CardContent className="p-6">
                                    <div className="relative mb-6 rounded-lg overflow-hidden">
                                        <Image
                                            src="/assets/animvanish.png"
                                            alt="AnimVanish"
                                            width={400}
                                            height={200}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Shield className="h-5 w-5 text-blue-500" />
                                        <h3 className="text-xl font-semibold">AnimVanish</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        Advanced animated vanishing effects for Minecraft servers. Make your staff vanish in style with stunning visual effects.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="secondary">Minecraft Plugin</Badge>
                                        <Link
                                            href="https://www.spigotmc.org/resources/animvanish-1-19-animated-vanishing.102183/"
                                            className={cn(buttonVariants({ size: "sm" }), "group")}
                                        >
                                            Download
                                            <ExternalLink className="ml-2 h-3 w-3 group-hover:scale-110 transition-transform" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-500/20">
                                <CardContent className="p-6">
                                    <div className="mb-6 flex items-center justify-center h-48 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
                                        <Bot className="h-24 w-24 text-green-500" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Bot className="h-5 w-5 text-green-500" />
                                        <h3 className="text-xl font-semibold">EnSave</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        Modern Discord bot with advanced features for server management, moderation, and community engagement. Built for the future.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                                            Discord Bot
                                        </Badge>
                                        <Link
                                            href="https://ensave.mikart.eu/"
                                            className={cn(buttonVariants({ size: "sm", variant: "outline" }), "group border-green-500/20 hover:bg-green-500/10")}
                                        >
                                            Explore
                                            <ExternalLink className="ml-2 h-3 w-3 group-hover:scale-110 transition-transform" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-red-500/20">
                                <CardContent className="p-6">
                                    <div className="mb-6 flex items-center justify-center h-48 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg">
                                        <Shield className="h-24 w-24 text-red-500" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Shield className="h-5 w-5 text-red-500" />
                                        <h3 className="text-xl font-semibold">GroupSecurity</h3>
                                        <Badge variant="outline" className="text-xs text-cyan">SOON</Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        Comprehensive security solutions for gaming communities. Protect your servers with advanced monitoring and threat detection.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20">
                                            Security Suite
                                        </Badge>
                                        <Link
                                            href="/docs/gs"
                                            className={cn(buttonVariants({ size: "sm", variant: "outline" }), "group border-red-500/20 hover:bg-red-500/10")}
                                        >
                                            Learn More
                                            <ExternalLink className="ml-2 h-3 w-3 group-hover:scale-110 transition-transform" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge variant="outline" className="mb-4">Latest Updates</Badge>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Stay Updated with Our <span className="text-primary">Blog</span>
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                                Get the latest insights, tutorials, and updates from our development team.
                                Learn about new features, best practices, and upcoming projects.
                            </p>
                            <Link href="/blog" className={cn(buttonVariants({ size: "lg" }), "group")}>
                                Read Our Blog
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-muted/30">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge variant="outline" className="mb-4">Join Our Community</Badge>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                    Built by Developers,
                                    <br />
                                    <span className="text-primary">for Developers</span>
                                </h2>
                                <p className="text-muted-foreground text-lg mb-8">
                                    Our projects are open source and some even community-driven. Join thousands of
                                    people who have used our tools and products.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/docs" className={cn(buttonVariants())}>
                                        Get Started
                                    </Link>
                                    <Link href="/flow/discord" className={cn(buttonVariants({ variant: "outline" }))}>
                                        Join Discord
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-6 text-center">
                                    <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                                    <div className="text-2xl font-bold">10k+</div>
                                    <div className="text-sm text-muted-foreground">Community Members</div>
                                </Card>
                                <Card className="p-6 text-center">
                                    <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                                    <div className="text-2xl font-bold">5/5</div>
                                    <div className="text-sm text-muted-foreground">Developer Rating</div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    )
}

export default Home
