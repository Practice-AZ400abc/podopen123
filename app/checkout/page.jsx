"use client"
import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { PaymentForm } from '@/components/PaymentForm';
import { CheckCheck, LoaderCircle } from 'lucide-react';

const Checkout = () => {
    const [clientToken, setClientToken] = useState(null);

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
                console.log("Fetched Client Token in Frontend:", data);

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
        <>
            <div className='h-screen bg-gray-50 w-full flex justify-center items-center'>

                {clientToken ? (
                    <PayPalScriptProvider options={initialOptions} >
                        <div className="flex flex-col gap-4 items-center justify-center w-[700px] bg-white p-8 rounded-lg shadow-lg">
                            <h1 className='text-[34px] font-bold text-blue-400 text-left'>30 $</h1>
                            <p className='text-slate-700  text-center max-w-[850px] mt-4'>To contact and connect with investors and see their profile please
                                get started with a fast, secure, payment. You’ll also get full access to create a listing to
                                obtain funding from a visa investor for your projects.</p>
                            <div className='flex flex-row items-center justify-center gap-4 mt-6'>
                                <CheckCheck size={24} className='text-blue-400 text-4xl' />
                                <span className='text-slate-700 text-sm'>Allows you to contact investors for 30 days to get funding for your projects</span>
                            </div>
                            <div className='flex flex-row items-center justify-center gap-4 '>
                                <CheckCheck size={24} className='text-blue-400 text-4xl' />
                                <span className='text-slate-700 text-sm'>Allows you to create a listing to get funding for your project
                                </span>
                            </div>
                            <PaymentForm />
                        </div>
                    </PayPalScriptProvider>
                ) : (
                    <LoaderCircle className='animate-spin' />
                )}

            </div>
        </>
    );
};

export default Checkout;
