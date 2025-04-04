import React from 'react'
import { Separator } from '@/components/ui/separator'

export const metadata = {
    title: 'Terms of Service'
}

export default function TermsPage() {
    return (
        <div className="container mx-auto p-8 my-4">
            <h1 className="text-4xl font-extrabold mb-6">Terms & Conditions</h1>
            <p className="text-lg leading-relaxed mb-4">Last updated: July 18, 2024</p>
            <p className="text-lg leading-relaxed mb-4">
                These Terms of Service (&#34;Terms&#34;) govern your use of the EnSave Discord bot (&#34;Bot&#34;),
                provided by EnSave (&#34;Company&#34;, &#34;we&#34;, &#34;us&#34;, or &#34;our&#34;). By accessing or
                using the Bot, you agree to be bound by these Terms. If you disagree with any part of the terms, then
                you do not have permission to access the Bot.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Use License</h2>
            <Separator className="mb-6" />
            <p className="text-lg leading-relaxed mb-4">
                1. Permission is granted to temporarily download one copy of the Bot for personal, non-commercial
                transitory viewing only. This is the grant of a license, not a transfer of title, and under this
                license, you may not:
            </p>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">General</h2>
                <p className="text-lg leading-relaxed">placeholder</p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <p className="text-lg leading-relaxed">placeholder</p>
            </section>
        </div>
    )
}
