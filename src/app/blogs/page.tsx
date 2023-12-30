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
                const response = await fetch('/api/blogs');
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
            <h1 className="text-2xl">Blogs</h1>
            <div className="mt-5">
                <ul>
                    {resources.map((resource: any) => (
                        <li key={resource.id}>
                            {/* Render your resource data here */}
                            {/* Example: <p>{resource.title}</p> */}
                            <h2><Link href={`/blogs/${resource.id}`}>{resource.title}</Link></h2>
                            <p className="text-gray-600">Desc: - {resource.description}</p>
                            <br/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
