"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Select from "react-select";
import AdminTable from "@/components/AdminTable";
import { Textarea } from "@/components/ui/textarea";

import { auth } from "@/app/firebase/firebaseConfig";
import { updatePassword } from "firebase/auth";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Blogs from "@/components/Blogs";

const AdminPage = () => {
    const router = useRouter();
    const [selectedTable, setSelectedTable] = useState("payments");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const [blogFormMode, setBlogFormMode] = useState("POST");
    const [blogId, setBlogId] = useState(null);

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
        let endpoint;

        if (blogFormMode === "POST") {
            endpoint = "/api/blog";
        } else if (blogFormMode === "PUT") {
            endpoint = `/api/blog/${blogId}`
        }

        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(endpoint, {
                method: blogFormMode,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(blogFormData),
            });

            if (!res.ok) {
                throw new Error("Failed to post blog");
            }

            setBlogFormData({
                title: "",
                body: "",
                bannerImg: "",
            });
            setBlogFormMode("POST");
            setBlogId(null);
            toast.success("Blog has been updated")
            setLoading(false)

        } catch (error) {
            console.error(error);
            setLoading(false)

        }
    }

    const handleEditButtonClick = (blog) => {
        setBlogFormData({
            title: blog.title,
            body: blog.body,
            bannerImg: blog.bannerImg,
        });

        setBlogFormMode("PUT");
        setBlogId(blog._id);
    }

    const [passwordFormData, setPasswordFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const updateUserPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (passwordFormData.password !== passwordFormData.confirmPassword) {
            return alert("Password and confirm password must match");
        }

        const user = auth.currentUser;
        if (!user) {
            toast.error("No authenticated user found.");
            return;
        }

        const credential = EmailAuthProvider.credential(user.email, prompt("Enter your current password:"));

        try {
            await reauthenticateWithCredential(user, credential); // Reauthenticate the user
            await updatePassword(user, passwordFormData.password);
            toast.success("Password updated successfully!");
            setPasswordFormData({ password: "", confirmPassword: "" });
            setLoading(false);
        } catch (error) {
            console.error("Error updating password:", error);
            alert(error.message);
            setLoading(false);
        }
    };

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
        <div className="p-4 mx-auto min-h-[100vh] container">
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
                        className="mb-10"
                        value={{ label: selectedTable, value: selectedTable }}
                        onChange={(selectedOption) => setSelectedTable(selectedOption.value)}
                        options={[
                            { value: "payments", label: "Transactions" },
                            { value: "seeker", label: "Investors" },
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
                    <form onSubmit={updateUserPassword} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label>New Password</label>
                            <input
                                value={passwordFormData.password}
                                onChange={(e) => setPasswordFormData((prev) => ({ ...prev, password: e.target.value }))}
                                type="password"
                                placeholder="Enter new password"
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Confirm New Password</label>
                            <input
                                value={passwordFormData.confirmPassword}
                                onChange={(e) => setPasswordFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                type="password"
                                placeholder="Confirm new password"
                                className="p-2 border rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-fit bg-blue-400 p-2 font-bold text-white rounded-md"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Set Password"}
                        </button>
                    </form>
                </div>
            )}

            {/* Blogs Section */}
            {activeSection === "blogs" && (
                <div>
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
                            <button
                                type="submit"
                                className="w-fit bg-blue-400 p-2 text-white rounded-md"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : "Add blog"}
                            </button>
                        </form>
                    </div>
                    <Blogs onEditButtonClick={handleEditButtonClick} />
                </div>
            )}
        </div>
    );
};

export default AdminPage;
