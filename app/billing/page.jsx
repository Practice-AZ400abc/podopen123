"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import Card from "@/components/Card";
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.back();
    } else {
      setToken(storedToken);
    }

    setActiveSubscription(jwtDecode(storedToken).subscriptionStatus === "Active");
  }, []);

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

  // const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="mx-auto container m-4">
      <div className="p-4 border rounded-md">
        <CardTitle>Your Plan</CardTitle>
        <CardDescription className="mt-2">
          You have {activeSubscription ? "an active" : "no active"} subscription.
        </CardDescription>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          {activeSubscription ?
            <Link href="/cancel-subscription">Cancel Plan</Link>
            : <Link href="/checkout">Buy Plan</Link>}
        </button>
        <h1 className="text-2xl text-blue-400 p-4">Billing History</h1>

       <div className="w-full flex items-center justify-center">
       {loading && <LoaderCircle className="animate-spin"/>}
       </div>
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Purchased at</TableHead>
                <TableHead>Expiring Date </TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Payment Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell className="font-medium">{invoice.orderId}</TableCell>
                  <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(new Date(invoice.createdAt).setDate(new Date(invoice.createdAt).getDate() + 30)).toLocaleDateString()}</TableCell>
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
