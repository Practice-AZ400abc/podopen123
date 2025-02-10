"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Select from "react-select";
import AdminTable from "@/components/AdminTable";
import { Textarea } from "@/components/ui/textarea";

const AdminPage = () => {
    const router = useRouter();
    const [selectedTable, setSelectedTable] = useState("payments");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isClient, setIsClient] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard"); // Track active section
    const itemsPerPage = 20;

    const [blogFormData, setBlogFormData] = useState({
        title: "",
        body: "",
        bannerImg: "",
    });

    // Function to upload an image to Cloudinary
    const uploadToCloudinary = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "lookvisa");
            formData.append("cloud_name", "dqayy79ql");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dqayy79ql/image/upload",
                { method: "POST", body: formData }
            );

            const data = await response.json();
            return data.secure_url; // Cloudinary returns the secure URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };

    // Handles file input change
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const uploadedImageUrl = await uploadToCloudinary(file);
        if (uploadedImageUrl) {
            setBlogFormData((prev) => ({ ...prev, bannerImg: uploadedImageUrl }));
        } else {
            alert("Image upload failed. Please try again.");
        }
    };

    const postBlog = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(blogFormData),
            });

            if (!res.ok) {
                throw new Error("Failed to post blog");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
        const storedToken = localStorage.getItem("token");
        if (!storedToken || jwtDecode(storedToken).role !== "Admin") {
            router.push("/");
        }
        setToken(storedToken);
    }, [isClient]);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const res = await fetch(`/api/get-users/${selectedTable}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to fetch data");
                const result = await res.json();
                setData(result);
                setCurrentPage(1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTable, token]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (!isClient) {
        return null;
    }

    return (
        <div className="p-4 mx-auto container">
            {/* Navigation */}
            <ul className="bg-white p-2 flex gap-4 mb-4 border rounded-sm">
                <li className={`text-black cursor-pointer ${activeSection === "dashboard" ? "font-bold" : ""}`} onClick={() => setActiveSection("dashboard")}>
                    Admin Dashboard
                </li>
                <li className={`text-black cursor-pointer ${activeSection === "settings" ? "font-bold" : ""}`} onClick={() => setActiveSection("settings")}>
                    Settings
                </li>
                <li className={`text-black cursor-pointer ${activeSection === "blogs" ? "font-bold" : ""}`} onClick={() => setActiveSection("blogs")}>
                    Add Blogs
                </li>
            </ul>

            {/* Dashboard Section */}
            {activeSection === "dashboard" && (
                <div>
                    <h1 className="text-xl font-bold mb-4 text-blue-400">Dashboard</h1>
                    <Select
                        value={{ label: selectedTable, value: selectedTable }}
                        onChange={(selectedOption) => setSelectedTable(selectedOption.value)}
                        options={[
                            { value: "payments", label: "Payments made" },
                            { value: "seeker", label: "Visa seekers" },
                            { value: "sponsor", label: "Visa sponsor" }
                        ]}
                    />
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <AdminTable data={paginatedData} table={selectedTable} />
                            <div className="flex justify-between mt-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-4 py-2 bg-gray-300 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-4 py-2 bg-gray-300 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Settings Section */}
            {activeSection === "settings" && (
                <div>
                    <h1 className="text-xl font-bold mb-4 text-blue-400">Settings</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label>New Password</label>
                            <input type="password" placeholder="Enter new password" className="p-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Confirm New Password</label>
                            <input type="password" placeholder="Confirm new password" className="p-2 border rounded-md" />
                        </div>
                        <button className="w-fit bg-blue-400 p-2 text-white rounded-md">Set Password</button>
                    </form>
                </div>
            )}

            {/* Blogs Section */}
            {activeSection === "blogs" && (
                <div>
                    <h1 className="text-xl font-bold mb-4 text-blue-400">Blogs</h1>
                    <form onSubmit={postBlog} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label>Title</label>
                            <input
                                value={blogFormData.title}
                                onChange={(e) => setBlogFormData((prev) => ({ ...prev, title: e.target.value }))}
                                type="text"
                                placeholder="Enter blog title"
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Description</label>
                            <Textarea
                                value={blogFormData.body}
                                onChange={(e) => setBlogFormData((prev) => ({ ...prev, body: e.target.value }))}
                                placeholder="Enter blog description"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Cover Image</label>
                            <input
                                onChange={handleFileChange}
                                type="file"
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <button type="submit" className="w-fit bg-blue-400 p-2 text-white rounded-md">Add Blog</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
