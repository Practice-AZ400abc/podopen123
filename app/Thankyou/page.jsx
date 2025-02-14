"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader } from "lucide-react";
import jsPDF from "jspdf";

import Logo from '@/app/Lookvisa.png'

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

        // LookVisa Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("LookVisa", 20, 20);

        // Payment Receipt Title with added space below
        doc.text("Payment Receipt", 20, 40);
        doc.text("", 20, 50); // Empty text to add space

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(`Order ID: ${payment.orderId}`, 20, 60);
        doc.text(`Amount: $${payment.amount} ${payment.currency}`, 20, 70);
        doc.text(`Payment Method: ${payment.paymentMethod}`, 20, 80);

        if (payment.paymentMethod === "Card") {
            doc.text(`Card: ${payment.cardBrand} (${payment.cardNumber})`, 20, 90);
        } else {
            doc.text(`PayPal Email: ${payment.paypalEmailAddress}`, 20, 90);
            doc.text(`PayPal Account ID: ${payment.paypalAccountId}`, 20, 100);
        }

        doc.text(`Date: ${new Date(payment.createdAt).toLocaleString()}`, 20, 110);

        // Add footer text
        doc.setFontSize(12);
        doc.text("Thank you for your Business!", 105, 270, { align: "center" });
        doc.text("Your credit card statement may show a charge for the merchant", 20, 280);
        doc.text("“Stellar Technologies, Inc”. For any questions, email info@lookvisa.com", 20, 290);

        doc.save(`receipt_${payment.orderId}.pdf`);
    };



    return (
        <div className="h-[50vh] flex flex-col gap-4 justify-center items-center">
            <div className="bg-green-200 p-4 rounded-full">
                <Check size={64} className="text-green-400 text-4xl" />
            </div>
            <h1 className="text-2xl font-semibold">Thank you</h1>

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
                <Loader className="animate-spin" />
            )}
        </div>
    );
};

export default Thankyou;
