"use client"
import { Loader } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState();
    // fetch the blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/blog")
            if (!response.ok) {
                throw new Error("Failed to fetch blogs")
            }
            const data = await response.json()
            setBlogs(data)
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, []) // Empty dependency array ensures this runs only once on mount

    return (
        <>
            <div className="min-h-[100vh] mx-auto bg-gray-100">
                <div className="mx-auto container p-4">
                    <h1 className="text-2xl md:text-4xl text-center mt-10 md:mt-20">
                        Discover the Latest <b className="text-blue-400">Blogs</b>
                    </h1>

                    {/* Render the blogs */}
                    {loading ?
                        <div className="flex justify-center items-center h-full max-h-full">
                            <Loader className="animate-spin" />
                        </div>
                        :
                        <>
                            <div className="mt-10">
                                {blogs.map((blog) => (
                                    <div key={blog._id} className="bg-white flex flex-col gap-6 md:flex-row p-6 rounded-lg  mb-6">
                                        <Image
                                            src={blog.bannerImg}
                                            alt={blog.title}
                                            width={400} // Replace with actual width
                                            height={400} // Replace with actual height
                                            className="rounded-lg"
                                        />
                                        <div>
                                            <h1 className="text-3xl  font-semibold underline">{blog.title}</h1>
                                            <p>{blog.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    )
}

export default Blogs