import { NextApiRequest, NextApiResponse } from 'next';
import {addDoc, collection, FieldValue, getDocs, limit, orderBy, query, doc, getFirestore} from "firebase/firestore";
import {db} from "@/app/firebaseClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const c = collection(db, 'resources')
        const q = query(c, orderBy('timestamp'), limit(25));
        const querySnapshot = await getDocs(q);

        const resources = querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            text: doc.data().text,
            title: doc.data().title,
            description: doc.data().description,
            author: doc.data().author,
            timestamp: doc.data().timestamp.toDate(),
        }));


        res.status(200).json(resources);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
}
