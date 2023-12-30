import { NextApiRequest, NextApiResponse } from 'next';
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import {db} from "@/app/firebaseClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const c = collection(db, 'downloads')
        const q = query(c, orderBy('updatedAt'), limit(25));
        const querySnapshot = await getDocs(q);

        const resources = querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            text: doc.data().text,
            title: doc.data().title,
            desc: doc.data().desc,
            updatedAt: doc.data().updatedAt.toDate(),
            version: doc.data().version,
            image: doc.data().version,
            download: doc.data().download
        }));


        res.status(200).json(resources);
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
}
