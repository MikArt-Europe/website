import { NextApiRequest, NextApiResponse } from 'next';
import {
    collection,
    doc,
    getDoc
} from "firebase/firestore";
import {db} from "@/app/firebaseClient";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id = req.query.id;
        const c = collection(db, 'users');
        // get the document using the id
        const user = await getDoc(doc(c, id as string));

        if (user.exists()) {
            const resource = {
                id: user.id,
                username: user.data().username,
                createdAt: user.data().createdAt.toDate(),
                role: user.data().role,
                image: user.data().image,
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