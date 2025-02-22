"use client"
import { Delete, DeleteIcon, FileEdit, Loader, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const Blogs = ({ onEditButtonClick }) => {
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

    const deleteBlog = async (id) => {
        if (!id) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/blog/${id}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Failed to delete blog");
            toast.success("Blog deleted successfully");
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        } catch (error) {
            toast.error("Failed to delete blog");
            console.log("Error deleting blog:", error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-[100vh] mx-auto">
            <div className="mx-auto max-w-[700px] p-4">
                <h1 className="text-2xl md:text-4xl text-center mt-10 md:mt-20">
                    All <b className="text-blue-400">Blogs</b>
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

                                <div key={blog._id} className="bg-gray-200 flex flex-col gap-6 md:flex-row p-6 rounded-lg mb-6">
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
                                        <div className="w-full flex justify-between items-center">
                                            <h1 className="text-2xl font-semibold underline">
                                                {blog.title.length > 50
                                                    ? `${blog.title.substring(0, 50)}...`
                                                    : blog.title}
                                            </h1>

                                        </div>
                                        <p>
                                            {blog.body.length > 100
                                                ? `${blog.body.substring(0, 100)}...`
                                                : blog.body}
                                        </p>
                                        <div className="flex gap-2 items-center mt-4">
                                            <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 text-white p-2 rounded-lg">
                                                <Trash className="cursor-pointer" />
                                            </button>

                                            <button onClick={() => onEditButtonClick(blog)} className="bg-green-400 text-white p-2 rounded-lg">
                                                <FileEdit className="cursor-pointer" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

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
