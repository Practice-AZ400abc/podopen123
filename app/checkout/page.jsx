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
            const response = await fetch("/api/paypal-token", {
                method: "POST",
            });
            const { client_token } = await response.json();
            setClientToken(client_token);
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
