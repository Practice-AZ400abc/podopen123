"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Select from "react-select";
import AdminTable from "@/components/AdminTable";
import Link from "next/link";

const AdminPage = () => {
    const router = useRouter();
    const [selectedTable, setSelectedTable] = useState("payments");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isClient, setIsClient] = useState(false); // State to track client-side rendering
    const itemsPerPage = 20;

    useEffect(() => {
        // Set the isClient state to true to indicate client-side rendering
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return; // Only run the logic after the component is mounted on the client
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
                console.log(data);
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

            <ul className="bg-white p-2 flex gap-4  mb-4 border rounded-sm">
                <li className="text-black ">
                    <Link href={"/"} className="underline">Admin Dashboard</Link>
                </li>
                <li className="text-black ">
                    <Link href={"/"} className="underline">Setting</Link>
                </li>
                <li className="text-black ">
                    <Link href={"/"} className="underline">Add Blogs</Link>
                </li>
            </ul>


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
    );
};

export default AdminPage;
