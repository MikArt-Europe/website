import { getPayload } from 'payload';
import config from '@payload-config';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
    const payload = await getPayload({ config });

    try {
        const { docs } = await payload.find({
            collection: 'docs',
            limit: 100,
            depth: 0,
        });

        const treeChildren = docs.reduce((acc: any[], doc: any) => {
            let categoryNode = acc.find(c => c.url === `/docs/${doc.category}`);
            if (!categoryNode) {
                categoryNode = {
                    title: doc.category,
                    url: `/docs/${doc.category}`,
                    children: [],
                };
                acc.push(categoryNode);
            }

            categoryNode.children.push({
                title: doc.title,
                url: `/docs/${doc.category}/${doc.slug}`,
            });

            return acc;
        }, []);

        return NextResponse.json(treeChildren);
    } catch (e) {
        payload.logger.error({ err: e, message: 'Error fetching docs' });
        return new Response('Error fetching docs.', { status: 500 });
    }
}
