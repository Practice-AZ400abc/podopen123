"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Select from "react-select";
import AdminTable from "@/components/AdminTable";
import Link from "next/link";
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
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label>Title</label>
                            <input type="text" placeholder="Enter blog title" className="p-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Description</label>
                            <Textarea placeholder="Enter blog description" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Cover Image</label>
                            <input type="file" className="p-2 border rounded-md" />
                        </div>
                        <button className="w-fit bg-blue-400 p-2 text-white rounded-md">Add Blog</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
