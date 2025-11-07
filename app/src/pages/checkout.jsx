// @ts-nocheck
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "../utils/api";
import { auth } from "../utils/firebaseConfig.js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";
import { envVars } from "../utils/envConfig";
import { useStateProvider } from "../context/StateContext";

const stripePromise = loadStripe(envVars.STRIPE_PK);

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [setupIntentClientSecret, setSetupIntentClientSecret] = useState(null);
  const router = useRouter();
  const { serviceId, tierId, serviceDate: serviceDateFromQuery } = router.query;
  const [{ isDarkMode, user }] = useStateProvider();
  const [savePaymentMethod, setSavePaymentMethod] = useState(true); // Default to true
  const [serviceDate, setServiceDate] = useState(serviceDateFromQuery || ""); // State for service date

  useEffect(() => {
    if (!serviceId || !tierId) {
      console.error("Service ID or Tier ID is missing.");
      return;
    }

    const createOrderIntent = async () => {
      const user = auth.currentUser;
      if (user && user.uid) {
        try {
          const orderPayload = {
            serviceId,
            tierId,
            savePaymentMethod,
            serviceDate,
            userEmail: user.email,
          };
          const orderData = await createOrder(orderPayload);
          if (orderData && orderData.clientSecret) {
            setClientSecret(orderData.clientSecret);
            if (orderData.setupIntentClientSecret) {
              setSetupIntentClientSecret(orderData.setupIntentClientSecret);
            }
          } else {
            console.error("Failed to create order or clientSecret missing:", orderData);
          }
        } catch (error) {
          console.error("Error creating order intent:", error);
        }
      } else {
        console.error("User not logged in. Cannot create order.");
      }
    };

    if (serviceDate) {
      createOrderIntent();
    }
  }, [serviceId, tierId, serviceDate, savePaymentMethod]);

  const appearance = {
    theme: isDarkMode ? "night" : "stripe",
    variables: {
      colorPrimary: isDarkMode ? '#A78BFA' : '#6D28D9',
      colorBackground: isDarkMode ? '#1F2937' : '#ffffff',
      colorText: isDarkMode ? '#E5E7EB' : '#1F2937',
      colorDanger: isDarkMode ? '#FCA5A5' : '#DC2626',
    },
    rules: {
      '.Input': {
        borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
        color: isDarkMode ? '#F9FAFB' : '#1F2937',
      },
      '.Input:focus': {
        borderColor: isDarkMode ? '#C4B5FD' : '#8B5CF6',
      },
      '.Label': {
        color: isDarkMode ? '#D1D5DB' : '#374151',
      },
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  const elementsKey = clientSecret + (isDarkMode ? "dark" : "light");

  return (
    <div className="min-h-[80vh] max-w-full mx-4 sm:mx-8 md:mx-12 lg:mx-20 py-8 flex flex-col gap-8 sm:gap-10 items-center">
      <h1 className="text-2xl sm:text-3xl text-center font-semibold text-neutral-darkest dark:text-neutral-lightest">
        Please complete the payment to place the order.
      </h1>
      {/* Service Date Input */}
      <div className="w-full max-w-md">
        <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Service Date
        </label>
        <input
          type="date"
          name="serviceDate"
          id="serviceDate"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-900 dark:text-gray-100"
          required
        />
      </div>

      {clientSecret && serviceDate ? (
        <Elements options={options} stripe={stripePromise} key={elementsKey}>
          <CheckoutForm
            savePaymentMethod={savePaymentMethod}
            setSavePaymentMethod={setSavePaymentMethod}
            setupIntentClientSecret={setupIntentClientSecret}
            userEmail={user?.email}
          />
        </Elements>
      ) : (
        serviceId && tierId ? ( // Show loading only if IDs are present but CS not yet fetched (or serviceDate not set)
          <p className="text-neutral-medium dark:text-neutral-light">
            {serviceDate ? "Loading payment options..." : "Please select a service date."}
          </p>
        ) : ( // Show error if IDs were missing from the start
          <p className="text-error dark:text-red-400">There was an issue loading payment details. Please check the URL or go back.</p>
        )
      )}
    </div>
  );
}

export default Checkout;
