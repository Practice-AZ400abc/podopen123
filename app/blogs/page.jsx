"use client"
import { Loader } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false); // ✅ Initialize loading state

    // Fetch the blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/blog")
            if (!response.ok) throw new Error("Failed to fetch blogs")

            const data = await response.json()
            setBlogs(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className="min-h-[100vh] mx-auto bg-gray-100">
            <div className="mx-auto max-w-[700px] p-4">
                <h1 className="text-2xl md:text-4xl text-center mt-10 md:mt-20">
                    Discover the Latest <b className="text-blue-400">Blogs</b>
                </h1>

                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader className="animate-spin" />
                    </div>
                ) : (
                    <div className="mt-10">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <Link key={blog._id} href={`/blogs/${blog._id}`}>
                                    <div className="bg-white flex flex-col gap-6 md:flex-row p-6 rounded-lg mb-6">
                                        {blog.bannerImg && (
                                            <Image
                                                src={blog.bannerImg}
                                                alt={blog.title}
                                                width={300}
                                                height={400}
                                                className="rounded-lg"
                                            />
                                        )}
                                        <div>
                                            <h1 className="text-2xl font-semibold underline">
                                                {blog.title.length > 50
                                                    ? `${blog.title.substring(0, 50)}...`
                                                    : blog.title}
                                            </h1>
                                            <p>
                                                {blog.body.length > 100
                                                    ? `${blog.body.substring(0, 100)}...`
                                                    : blog.body}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No blogs found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Blogs
