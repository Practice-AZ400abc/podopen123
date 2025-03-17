'use client';

import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Layout = ({ children }) => {
    return (
        <>
            <PayPalScriptProvider
                options={{
                    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                    components: "buttons,hosted-fields",
                    intent: "capture",
                    "data-client-token": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_TOKEN,
                }}
            >
               {children}
            </PayPalScriptProvider>
        </>
    );
}

export default Layout;