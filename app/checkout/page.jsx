"use client"
import { useContext } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { PaymentForm } from '@/components/PaymentForm';
import { CheckCheck, LoaderCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthProvider';

const Checkout = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();
    const [clientToken, setClientToken] = useState(null);

    const [investorId, setInvestorId] = useState(null);

    useEffect(() => {
        const storedInvestorId = sessionStorage.getItem("seekerId");

        if (storedInvestorId) {
            setInvestorId(storedInvestorId);
        }
    }, [])

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken || !isLoggedIn) {
            return router.back();
        }

        if (jwtDecode(storedToken).subscriptionStatus === "Active" && investorId) {
            if (investorId) {
                return router.push(`/search/inner/${investorId}`);
            } else {
                return router.back();
            }
        }
    }, [investorId])

    const initialOptions = {
        "client-id": "test",
        "enable-funding": "",
        "disable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_ac",
        "dataClientToken": clientToken,
        components: "hosted-fields,buttons",
    };


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("/api/paypal-token", { method: "POST" });
                const data = await response.json();

                if (data.client_token) {
                    setClientToken(data.client_token);
                } else {
                    throw new Error("No client token received");
                }
            } catch (error) {
                console.error("Error fetching PayPal client token:", error);
            }
        })();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {clientToken ? (
                <PayPalScriptProvider options={initialOptions}>
                    <div className=" px-4 py-12">
                        {/* Header Section */}
                        <div className="text-center mb-12 space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Premium Access
                            </h1>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                                Connect with investors and unlock full potential for your projects
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="max-w-6xl mx-auto">
                            {/* Features Grid */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {/* Left Side - Features */}
                                <div className="bg-white rounded-2xl p-8 shadow-xl transform transition-all hover:shadow-2xl">
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl transition-all hover:scale-[1.02]">
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <CheckCheck size={24} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-800 mb-1">30-Day Investor Access</h3>
                                                <p className="text-slate-600">Connect directly with potential investors and explore funding opportunities</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl transition-all hover:scale-[1.02]">
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <CheckCheck size={24} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-800 mb-1">Project Listing</h3>
                                                <p className="text-slate-600">Create and showcase your projects to attract visa investors</p>
                                            </div>
                                        </div>

                                        {/* Price Card */}
                                        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-blue-100">One-time Payment</p>
                                                    <h2 className="text-3xl font-bold mt-1">$1.00</h2>
                                                </div>
                                                <div className="bg-white/20 px-4 py-2 rounded-lg">
                                                    <span className="text-sm">30 Days Access</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Payment Form */}
                                <div className="bg-white rounded-2xl p-8 shadow-xl">
                                    <PaymentForm investorId={investorId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </PayPalScriptProvider>
            ) : (
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center">
                        <LoaderCircle className="animate-spin w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <p className="text-slate-600">Loading payment options...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
