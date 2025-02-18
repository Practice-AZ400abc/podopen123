"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import parse from "html-react-parser"; // Import the parser

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (!res.ok) throw new Error("Failed to fetch blog");

                const data = await res.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!blog) return <p className="text-center mt-10">No blog found.</p>;

    return (
        <div className="min-h-screen mx-auto container p-3 max-w-3xl">
            <Image
                src={blog.bannerImg}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded-lg w-full object-cover mb-6"
            />
            <h1 className="text-3xl font-bold">{blog.title}</h1>

            {/* Render blog body as HTML */}
            <div className="mt-4 text-gray-700">{parse(blog.body)}</div>
        </div>
    );
};

export default BlogDetails;
