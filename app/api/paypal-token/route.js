import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                Authorization: "Basic " + Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        });

        const data = await response.json();
        if (!data.access_token) {
            throw new Error("Failed to get access token");
        }

        const orderResponse = await fetch("https://api-m.sandbox.paypal.com/v1/billing-agreements/agreement-tokens", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${data.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: "Test Agreement",
                payer: { payment_method: "PAYPAL" },
            }),
        });

        const orderData = await orderResponse.json();
        return NextResponse.json({ client_token: orderData.token });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
