
"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader } from "lucide-react";
import jsPDF from "jspdf";
import Logo from '@/app/Lookvisa.png'; // Import Image

const Thankyou = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [payment, setPayment] = useState(null);
    const [logoBase64, setLogoBase64] = useState(null); // Store Base64 Image

    useEffect(() => {
        const fetchPayment = async () => {
            const response = await fetch(`/api/payments/${orderId}`);
            const data = await response.json();
            setPayment(data);
        };

        if (orderId) {
            fetchPayment();
        }

        // Convert Image to Base64
        const convertToBase64 = async () => {
            const response = await fetch(Logo.src);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => setLogoBase64(reader.result);
            reader.readAsDataURL(blob);
        };

        convertToBase64();
    }, [orderId]);

    const downloadReceipt = () => {
        if (!payment || !logoBase64) return;

        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);

        doc.addImage(logoBase64, "PNG", 10, 20, 30, 30); // Use Base64 image

        // Add text
        doc.text("Payment Receipt", 20, 60);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(`Order ID: ${payment.orderId}`, 20, 70);
        doc.text(`Amount: $${payment.amount} ${payment.currency}`, 20, 80);
        doc.text(`Payment Method: ${payment.paymentMethod}`, 20, 90);

        doc.text(`Date: ${new Date(payment.createdAt).toLocaleString()}`, 20, 100);

        // Footer
        doc.setFontSize(12);
        doc.text("For any questions, email info@lookvisa.com. Thank you for your business!", 105, 270, { align: "center" });

        doc.save(`receipt_${payment.orderId}.pdf`);
    };

    return (
        <div className="h-[100vh] flex flex-col gap-4 justify-center items-center">
            <div className="bg-green-200 p-4 rounded-full">
                <Check size={64} className="text-green-400 text-4xl" />
            </div>
            <h1 className="text-2xl font-semibold">Thank you</h1>

            {payment ? (
                <div className="bg-white border p-4 rounded-lg  w-[80%] max-w-md">
                    <h2 className="text-lg font-semibold">Receipt</h2>
                    <p><strong>Order ID:</strong> {payment.orderId}</p>
                    <p><strong>Amount:</strong> ${payment.amount} {payment.currency}</p>
                    <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600"
                        onClick={downloadReceipt}
                        disabled={!logoBase64} // Disable button until image loads
                    >
                        Download Receipt
                    </button>
                </div>
            ) : (
                <Loader className="animate-spin" />
            )}
        </div>
    );
};

export default Thankyou;
