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

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="mx-auto container m-4">
      <h1 className="text-2xl text-blue-400 p-4">Billing History</h1>
      <p>You currently {!activeSubscription ? "do not" : ""} have an active subcription </p>

      {loading && <p>Loading invoices...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Paid at</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Details</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium">{invoice.orderId}</TableCell>
                <TableCell>{new Date(invoice.createdAt).toLocaleString()}</TableCell>
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
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                USD {totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default Billing;
