"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import jsPDF from "jspdf";

const Thankyou = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [payment, setPayment] = useState(null);

    useEffect(() => {
        const fetchPayment = async () => {
            const response = await fetch(`/api/payments/${orderId}`);
            const data = await response.json();

            setPayment(data);
        }

        if (orderId) {
            fetchPayment();
        }
    }, [orderId]);

    const downloadReceipt = () => {
        if (!payment) return;

        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("LookVisa", 20, 20);
        doc.text("Payment Receipt", 20, 40);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(`Order ID: ${payment.orderId}`, 20, 40);
        doc.text(`Amount: $${payment.amount} ${payment.currency}`, 20, 50);
        doc.text(`Payment Method: ${payment.paymentMethod}`, 20, 60);
        if (payment.paymentMethod === "Card") {
            doc.text(`Card: ${payment.cardBrand} (${payment.cardNumber})`, 20, 70);
        } else {
            doc.text(`PayPal Email: ${payment.paypalEmailAddress}`, 20, 70);
            doc.text(`PayPal Account ID: ${payment.paypalAccountId}`, 20, 80);
        }
        doc.text(`Date: ${new Date(payment.createdAt).toLocaleString()}`, 20, 80);

        doc.save(`receipt_${payment.orderId}.pdf`);
    };

    return (
        <div className="h-[50vh] flex flex-col gap-4 justify-center items-center">
            <div className="bg-green-200 p-4 rounded-full">
                <Check size={64} className="text-green-400 text-4xl" />
            </div>
            <h1 className="text-2xl font-semibold">Thank you for your order!</h1>

            {payment ? (
                <div className="bg-white border p-4 rounded-lg  w-[80%] max-w-md">
                    <h2 className="text-lg font-semibold">Receipt</h2>
                    <p><strong>Order ID:</strong> {payment.orderId}</p>
                    <p><strong>Amount:</strong> ${payment.amount} {payment.currency}</p>
                    <p><strong>Card:</strong> {payment.cardBrand} ({payment.cardNumber})</p>
                    <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600"
                        onClick={downloadReceipt}
                    >
                        Download Receipt
                    </button>
                </div>
            ) : (
                <p>Loading receipt...</p>
            )}
        </div>
    );
};

export default Thankyou;
