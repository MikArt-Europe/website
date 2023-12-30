import { NextApiRequest, NextApiResponse } from 'next';
import {
    collection,
    doc,
    getDoc
} from "firebase/firestore";
import {db} from "@/app/firebaseClient";

// TODO: use this?
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
        const c = collection(db, 'downloads');
        // get the document using the id
        const d = await getDoc(doc(c, id as string));

        if (d.exists()) {
            const resource = {
                id: d.id,
                text: d.data().text,
                title: d.data().title,
                desc: d.data().desc,
                updatedAt: d.data().updatedAt.toDate(),
                version: d.data().version,
                image: d.data().version,
                download: d.data().download
            };

            res.status(200).json(resource);
        } else {
            res.status(404).json({ error: 'Resource not found' });
        }
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({ error: 'Failed to fetch resource' });
    }
}