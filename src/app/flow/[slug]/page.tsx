import {redirect} from "next/navigation";

const flows = [
    ["discord", "https://discord.gg/VUAHvffhTz"],
    ["earth", "https://earth.mikart.eu/"],
    ["store", "https://store.mikart.eu/"],
]

export default function Page({ params }: { params: { slug: string } }) {

    const flow = flows.find(([flowSlug]) => flowSlug === params.slug)

    if (flow) {
        const [, url] = flow
        redirect(url)
    }

    // Render something here if the slug doesn't match any flow
    return <p>Flow not found</p>
}