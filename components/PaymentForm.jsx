import { useState, useRef } from "react";
import styles from "@/app/PaymentForm.module.css";
import { jwtDecode } from "jwt-decode";

import {
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  PayPalButtons,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";

async function createOrderCallback() {
  try {
    const accessTokenResponse = await fetch("/api/paypal-token", { method: "POST" });

    const accessTokenData = await accessTokenResponse.json();
    console.log("PayPal Access Token Response:", accessTokenData);
    if (!accessTokenData.access_token) {
      throw new Error("Failed to get access token");
    }

    const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessTokenData.access_token}`, // Replace with your token logic
      },
      body: JSON.stringify({
        "intent": "CAPTURE",
        "purchase_units": [{
          "amount": {
            "currency_code": "USD",
            "value": "30.00"
          },
          "description": "30 days subscription"
        }]
      }),
    });

    const orderData = await response.json();

    if (orderData.id) {
      return orderData.id;
    } else {
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        : JSON.stringify(orderData);

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    return `Could not initiate PayPal Checkout...${error}`;
  }
}

async function onApproveCallback(data, actions) {
  try {
    const orderId = data.orderID;

    const accessTokenResponse = await fetch("/api/paypal-token", { method: "POST" });

    const accessTokenData = await accessTokenResponse.json();
    console.log("PayPal Access Token Response:", accessTokenData);
    if (!accessTokenData.access_token) {
      throw new Error("Failed to get access token");
    }

    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessTokenData.access_token}`, // Replace with your token logic
        },
      }
    );

    const orderData = await response.json();
    const transaction =
      orderData?.purchase_units?.[0]?.payments?.captures?.[0];

    if (!transaction || transaction.status !== "COMPLETED") {
      throw new Error(
        `Transaction failed: ${JSON.stringify(orderData, null, 2)}`
      );
    }

    // 1. Update user subscription
    const userId = jwtDecode(localStorage.getItem("token"))._id;
    const subscriptionResponse = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionStatus: "Active",
        subscriptionExpiresAt: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ), // 30 days from now
      }),
    });

    if (!subscriptionResponse.ok) {
      throw new Error(
        `Failed to update subscription: ${await subscriptionResponse.text()}`
      );
    }

    // 2. Retrieve JWT
    const firebaseUid = jwtDecode(localStorage.getItem("token")).firebaseUid; // Replace with the actual UID
    const tokenResponse = await fetch(`/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseUid }),
    });

    if (!tokenResponse.ok) {
      throw new Error(
        `Failed to retrieve token: ${await tokenResponse.text()}`
      );
    }

    const tokenData = await tokenResponse.json();

    localStorage.setItem("token", tokenData.token);

    const paymentResponse = await fetch("/api/payments", {
      method: "POST",
      body: JSON.stringify({
        orderId,
        userId,
        amount: "30.00",
        currency: "USD",
      })
    });

    if (!paymentResponse) {
      throw new Error(
        `Failed to create payment: ${await paymentResponse.text()}`
      );
    }

    console.log("Order captured and API calls successful!", tokenData);
    return `Transaction ${transaction.status}: ${transaction.id}`;
  } catch (error) {
    console.error(error);
    return `Sorry, your transaction could not be processed...${error.message}`;
  }
}


const SubmitPayment = ({ onHandleMessage }) => {
  // Here declare the variable containing the hostedField instance
  const { cardFields } = usePayPalHostedFields();
  const cardHolderName = useRef(null);

  const submitHandler = () => {
    if (typeof cardFields.submit !== "function") return; // validate that \`submit()\` exists before using it
    //if (errorMsg) showErrorMsg(false);
    cardFields
      .submit({
        // The full name as shown in the card and billing addresss
        // These fields are optional for Sandbox but mandatory for production integration
        cardholderName: cardHolderName?.current?.value,
      })
      .then(async (data) => onHandleMessage(await onApproveCallback(data)))
      .catch((orderData) => {
        onHandleMessage(
          `Sorry, your transaction could not be processed...${JSON.stringify(
            orderData,
          )}`,
        );
      });
  };

  return (
    <button onClick={submitHandler} className="btn button btn-primary">
      Pay
    </button>
  );
};

const Message = ({ content }) => {
  return <p>{content}</p>;
};

export const PaymentForm = () => {

  const [message, setMessage] = useState("");
  return (
    <div className={styles.form}>
      <PayPalButtons
        style={{
          shape: "rect",
          layout: "vertical",
        }}
        styles={{ marginTop: "4px", marginBottom: "4px" }}
        createOrder={createOrderCallback}
        onApprove={async (data) => setMessage(await onApproveCallback(data))}
      />

      <PayPalHostedFieldsProvider createOrder={createOrderCallback}
        onApprove={async (data) => setMessage(await onApproveCallback(data))}>
        <div style={{ marginTop: "4px", marginBottom: "4px" }}>
          <PayPalHostedField
            id="card-number"
            hostedFieldType="number"
            options={{
              selector: "#card-number",
              placeholder: "Card Number",
            }}
            className={styles.input}
          />
          <div className={styles.container}>
            <PayPalHostedField
              id="expiration-date"
              hostedFieldType="expirationDate"
              options={{
                selector: "#expiration-date",
                placeholder: "Expiration Date",
              }}
              className={styles.input}
            />
            <PayPalHostedField
              id="cvv"
              hostedFieldType="cvv"
              options={{
                selector: "#cvv",
                placeholder: "CVV",
              }}
              className={styles.input}
            />
          </div>
          <div className={styles.container}>
            <input
              id="card-holder"
              type="text"
              placeholder="Name on Card"
              className={styles.input}
            />

            <input
              id="card-billing-address-country"
              type="text"
              placeholder="Country Code"
              className={styles.input}
            />
          </div>
          <SubmitPayment onHandleMessage={setMessage} />
        </div>
      </PayPalHostedFieldsProvider>
      <Message content={message} />
    </div>
  );
};
