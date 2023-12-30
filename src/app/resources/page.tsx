"use client";
import {
    useEffect,
    useState
} from 'react';
import Link from "next/link";

export default function Resources() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/resources');
                const data = await response.json();
                setResources(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Resources</h1>
            <ul>
                {resources.map((resource: any) => (
                    <li key={resource.id}>
                        {/* Render your resource data here */}
                        {/* Example: <p>{resource.title}</p> */}
                        <h2><Link href={`/resources/${resource.id}`}>{resource.title}</Link></h2>
                        <p>{resource.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
