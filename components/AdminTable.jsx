"use client";

const AdminTable = ({ data, table }) => {
    const headersMap = {
        seeker: ["First Name", "Last Name", "Email", "Date Joined", "Country of Nationality"],
        sponsor: ["First Name", "Last Name", "Email", "Date Joined", "Company Name"],
        payments: ["Email", "Transaction Date", "Amount", "Order ID"],
    };

    if (!headersMap[table]) return <p>Invalid table type</p>;
    console.log(data)

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {headersMap[table].map((header, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {table === "seeker" && (
                                    <>
                                        <td className="border border-gray-300 px-4 py-2">{row.firstName ?? "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.lastName ?? "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.contactEmail ?? "-"}</td>


                                        <td className="border border-gray-300 px-4 py-2">{new Date(row.createdAt).toLocaleDateString() || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.nationality || "-"}</td>
                                    </>
                                )}

                                {table === "sponsor" && (
                                    <>
                                        <td className="border border-gray-300 px-4 py-2">{row.firstName || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.lastName || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.contactEmail || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(row.createdAt).toLocaleDateString() || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.companyName || "-"}</td>
                                    </>
                                )}

                                {table === "payments" && row.orderId && (
                                    <>

                                        <td className="border border-gray-300 px-4 py-2">{row.userId?.email || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(row.createdAt).toLocaleDateString() || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.amount || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.orderId || "-"}</td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headersMap[table].length} className="border border-gray-300 px-4 py-2 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;
