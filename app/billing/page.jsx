"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { jwtDecode } from "jwt-decode";
import Logo from "@/app/Lookvisa.png"; // Import Image
import {
  Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

const Billing = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(false);
  const [logoBase64, setLogoBase64] = useState(null);

  // Run only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        router.back();
      } else {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          setActiveSubscription(decoded.subscriptionStatus === "Active");
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    }
  }, [router]);

  // Convert Image to Base64
  useEffect(() => {
    const convertToBase64 = async () => {
      try {
        const response = await fetch(Logo.src);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result);
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error converting image:", error);
      }
    };
    convertToBase64();
  }, []);

  // Fetch invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/payments", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch invoices");

        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [token]);

  // Download Receipt
  const downloadReceipt = (payment) => {
    if (!payment || !logoBase64) return;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.addImage(logoBase64, "PNG", 10, 20, 30, 30); // Use Base64 image

    doc.text("Payment Receipt", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Order ID: ${payment.orderId}`, 20, 70);
    doc.text(`Amount: $${payment.amount} ${payment.currency}`, 20, 80);
    doc.text(`Payment Method: ${payment.paymentMethod}`, 20, 90);
    doc.text(`Date: ${new Date(payment.createdAt).toLocaleString()}`, 20, 100);

    doc.setFontSize(12);
    doc.text(
      "Note: Your credit card statement may show a charge for the merchant 'Stellar Technologies, Inc'. For any questions, email info@lookvisa.com. Thank you for your business!",
      105, 270, { align: "center" }
    );

    doc.save(`receipt_${payment.orderId}.pdf`);
  };

  return (
    <div className="mx-auto container m-4 min-h-[100vh]">
      <div className="p-4 border rounded-md">
        <CardTitle>Your Plan</CardTitle>
        <CardDescription className="mt-2">
          You have {activeSubscription ? "an active" : "no active"} plan.
        </CardDescription>
        {!activeSubscription && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            <Link href="/checkout">Buy Plan</Link>
          </button>
        )}
        <h1 className="text-2xl text-blue-400 p-4">Billing History</h1>

        <div className="w-full flex items-center justify-center">
          {loading && <LoaderCircle className="animate-spin" />}
        </div>
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date of Purchase</TableHead>
                <TableHead>Expiration Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Payment Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell className="font-medium">{invoice.orderId}</TableCell>
                  <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {new Date(new Date(invoice.createdAt).setDate(new Date(invoice.createdAt).getDate() + 30)).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>
                    {invoice.paymentMethod === "Card" ? (
                      <span>
                        {invoice.cardBrand} {invoice.cardNumber}
                      </span>
                    ) : invoice.paymentMethod === "PayPal" ? (
                      <span>{invoice.paypalEmailAddress}</span>
                    ) : (
                      <span>—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.currency} {invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      className="mt-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600"
                      onClick={() => downloadReceipt(invoice)}
                      disabled={!logoBase64}
                    >
                      Download Receipt
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Billing;
