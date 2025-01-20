"use client"
import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { PaymentForm } from '@/components/PaymentForm';
const Checkout = () => {
    const [clientToken, setClientToken] = useState(null);

    const initialOptions = {
        "client-id": "test",
        "enable-funding": "",
        "disable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_ac",
        "data-client-token": clientToken, 
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
            {clientToken ? (
                <PayPalScriptProvider options={initialOptions}>
                    <PaymentForm />
                </PayPalScriptProvider>
            ) : (
                <h4>WAITING ON CLIENT TOKEN</h4>
            )}
        </>
    );
};

export default Checkout;
