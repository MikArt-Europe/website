import { NextApiRequest, NextApiResponse } from 'next';
import {
    collection,
    doc,
    getDoc
} from "firebase/firestore";
import {db} from "@/app/firebaseClient";

interface Author {
    id: string;
    username: string;
    role: string;
    image: string;
    createdAt: Date;
    email: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id = req.query.id;
        const c = collection(db, 'resources');
        // get the document using the id
        const d = await getDoc(doc(c, id as string));

        let author: Author;

        if (d.exists()) {
            //const author = await fetch(`http://localhost:3000/api/users/${d.data().author.id}`).then((res) => {res.json()});

            author = await fetch(`http://localhost:3000/api/users/${d.data().author.id}`).then((res) => res.json());

            const resource = {
                id: d.id,
                text: d.data().text,
                title: d.data().title,
                description: d.data().description,
                // @ts-ignore
                author: {
                    // @ts-ignore
                    id: author.id,
                    username: author.username,
                    role: author.role,
                    createdAt: author.createdAt,
                    email: author.email,
                    image: author.image,
                },
                timestamp: d.data().timestamp.toDate(),
            };

            res.status(200).json(resource);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
}