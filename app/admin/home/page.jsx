"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { UserRoundIcon } from "lucide-react";

const options = [
    { value: "visa_seekers", label: "Visa Seekers" },
    { value: "visa_sponsors", label: "Visa Sponsors" },
    { value: "payments", label: "Payments Made" }
];

const AdminPage = () => {
    const router = useRouter();
    const [selectedTable, setSelectedTable] = useState(options[0]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isClient, setIsClient] = useState(false); // State to track client-side rendering
    const itemsPerPage = 20;

    let endpoint = "";

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
                if (selectedTable.value === "visa_seekers") {
                    endpoint = "/api/get-users/seeker";
                } else if (selectedTable.value === "visa_sponsors") {
                    endpoint = "/api/get-users/sponsor";
                } else if (selectedTable.value === "payments") {
                    endpoint = "/api/get-users/payments";
                }

                const res = await fetch(endpoint, {
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

    const renderTableHeaders = () => {
        if (selectedTable.value === "visa_seekers") {
            return ["First Name", "Last Name", "Email", "Date Joined", "Nationality"];
        } else if (selectedTable.value === "visa_sponsors") {
            return ["First Name", "Last Name", "Email", "Date Joined", "Company Name"];
        } else if (selectedTable.value === "payments") {
            return ["First Name", "Last Name", "Email", "Transaction Date", "Amount", "Order ID"];
        }
        return [];
    };

    const getMappedField = (header, item) => {
        const mapping = {
            "First Name": "firstName",
            "Last Name": "lastName",
            "Email": "email",
            "Date Joined": "createdAt",
            "Nationality": "nationality",
            "Company Name": "companyName",
            "Transaction Date": "createdAt",
            "Amount": "amount",
            "Order ID": "orderId"
        };
        return item[mapping[header]] || "-";
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (!isClient) {
        return null; // Ensure nothing is rendered until the client-side is ready
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
            <Select
                options={options}
                value={selectedTable}
                onChange={setSelectedTable}
                className="mb-4 w-64"
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table className="w-full border border-collapse border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                {renderTableHeaders().map((header, index) => (
                                    <th key={index} className="border p-2">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <tr key={index} className="border">
                                        {renderTableHeaders().map((header, i) => (
                                            <td key={i} className="border p-2">{getMappedField(header, item)}</td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-2 text-center" colSpan={renderTableHeaders().length}>No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
