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
        console.log("PayPal Access Token Response:", data);
        if (!data.access_token) {
            throw new Error("Failed to get access token");
        }
        const tokenResponse = await fetch("https://api-m.sandbox.paypal.com/v1/identity/generate-token", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${data.access_token}`,
                "Content-Type": "application/json",
            },
        });

        const tokenData = await tokenResponse.json();
        console.log("PayPal Client Token Response:", tokenData);

        if (!tokenData.client_token) {
            throw new Error("Failed to get client token");
        }

        return NextResponse.json({ client_token: tokenData.client_token });
    } catch (error) {
        console.error("PayPal API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
