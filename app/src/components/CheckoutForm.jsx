import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useStateProvider } from "../context/StateContext";
import { envVars } from "../utils/envConfig.js";
import Button from "./common/Button.jsx";
import { getService } from "../utils/api.js";
import { reducerCases } from "../context/constants.js";

export default function CheckoutForm({ savePaymentMethod, setSavePaymentMethod, setupIntentClientSecret, userEmail }) { // Added props
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [{ serviceData: contextServiceData }, dispatch] = useStateProvider();

  const [email, setEmail] = useState(userEmail || "");
  const [selectedTierDetails, setSelectedTierDetails] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTierDetails, setIsFetchingTierDetails] = useState(false);

  useEffect(() => {
    const { serviceId, tierId } = router.query;

    if (!serviceId || !tierId) {
      setMessage("Service ID or Tier ID is missing in the URL.");
      return;
    }

    const loadTierDetails = async () => {
      setMessage(null);
      setSelectedTierDetails(null);

      if (contextServiceData && contextServiceData.id === serviceId && contextServiceData.tiers) {
        const foundTier = contextServiceData.tiers.find(tier => tier.id === tierId);
        if (foundTier) {
          setSelectedTierDetails(foundTier);
          return;
        } else {
          setMessage(`Tier with ID ${tierId} not found in the current service data. Attempting to fetch.`);
        }
      }

      setIsFetchingTierDetails(true);
      try {
        const fetchedService = await getService(serviceId);
        if (fetchedService) {
          dispatch({ type: reducerCases.SET_SERVICE_DATA, serviceData: fetchedService });
          if (fetchedService.tiers) {
            const foundTier = fetchedService.tiers.find(tier => tier.id === tierId);
            if (foundTier) {
              setSelectedTierDetails(foundTier);
            } else {
              setMessage(`Selected tier (ID: ${tierId}) not found for service (ID: ${serviceId}) after fetching.`);
            }
          } else {
            setMessage(`No tiers found for service (ID: ${serviceId}) after fetching.`);
          }
        } else {
          setMessage(`Service with ID ${serviceId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching service details in CheckoutForm:", error);
        setMessage(`Error loading service details: ${error.message}`);
      } finally {
        setIsFetchingTierDetails(false);
      }
    };

    loadTierDetails();
  }, [router.query, contextServiceData, dispatch]);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment captured successfully!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        case "requires_capture":
          setMessage("Payment authorized successfully! Your order is awaiting seller approval.");
          break;
        default:
          setMessage(`Something went wrong. Status: ${paymentIntent.status}`);
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    setMessage(null);

    // First, handle the SetupIntent if the user wants to save their card
    if (savePaymentMethod && setupIntentClientSecret) {
      const { error: setupError } = await stripe.confirmCardSetup(
        setupIntentClientSecret, {
          payment_method: {
            card: elements.getElement(PaymentElement),
          },
        }
      );

      if (setupError) {
        setMessage(setupError.message);
        setIsLoading(false);
        return;
      }
    }

    // Then, confirm the payment
    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${envVars.WEB_URL}/success`,
      },
    });

    if (paymentError) {
      if (paymentError.type === "card_error" || paymentError.type === "validation_error") {
        setMessage(paymentError.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const linkAuthenticationElementOptions = {
    defaultValues: {
      email: email,
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {selectedTierDetails && (
        <div className="mb-6 p-4 border dark:border-neutral-medium rounded-lg shadow bg-white dark:bg-neutral-dark">
          <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-3">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-medium dark:text-neutral-light">Service:</span>
              <span className="font-medium text-neutral-dark dark:text-neutral-light">{contextServiceData?.title || (selectedTierDetails ? "Service Title" : "")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-medium dark:text-neutral-light">Tier:</span>
              <span className="font-medium text-neutral-dark dark:text-neutral-light">{selectedTierDetails.tierName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-medium dark:text-neutral-light">Price:</span>
              <span className="font-bold text-xl text-accent dark:text-accent-light">S${selectedTierDetails.tierPrice}</span>
            </div>
            {selectedTierDetails.tierInclusions && selectedTierDetails.tierInclusions.length > 0 && (
              <div className="pt-2">
                <span className="text-sm text-neutral-medium dark:text-neutral-light">Includes:</span>
                <ul className="list-disc list-inside text-sm text-neutral-dark dark:text-neutral-light">
                  {selectedTierDetails.tierInclusions.slice(0, 3).map(inclusion => (
                    <li key={inclusion.id || inclusion.label}>{inclusion.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {isFetchingTierDetails && (
        <div className="mb-6 p-4 border dark:border-neutral-medium rounded-lg shadow bg-white dark:bg-neutral-dark text-center">
          <p className="text-neutral-medium dark:text-neutral-light">Loading tier details...</p>
        </div>
      )}
      {!isFetchingTierDetails && !selectedTierDetails && !message && (
        <div className="mb-6 p-4 border dark:border-neutral-medium rounded-lg shadow bg-white dark:bg-neutral-dark text-center">
          <p className="text-neutral-medium dark:text-neutral-light">Tier details not available.</p>
        </div>
      )}

      <form id="payment-form" onSubmit={handleSubmit} className="w-full space-y-6 bg-white dark:bg-neutral-dark p-6 sm:p-8 rounded-lg shadow-md border dark:border-neutral-medium">
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.value.email)} // Ensure you are getting email from e.value.email
          options={linkAuthenticationElementOptions}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        {/* Save Payment Method Checkbox and Info */}
        <div>
          <div className="flex items-center">
            <input
              id="save-payment-method"
              type="checkbox"
              checked={savePaymentMethod}
              onChange={(e) => setSavePaymentMethod(e.target.checked)}
              className="h-4 w-4 text-accent dark:text-accent-light border-neutral-medium dark:border-neutral-dark rounded focus:ring-accent dark:focus:ring-accent-light dark:bg-neutral-dark"
            />
            <label
              htmlFor="save-payment-method"
              className="ml-2 block text-sm font-medium text-neutral-dark dark:text-neutral-light"
            >
              Save my payment details for future purchases
            </label>
          </div>
          <p className="mt-1 ml-6 text-xs text-neutral-medium dark:text-neutral-light">
            For a faster checkout next time. Your card details are stored securely with Stripe.
          </p>
        </div>

        <Button
          variant="filled"
          size="lg"
          disabled={isLoading || isFetchingTierDetails || !stripe || !elements || !selectedTierDetails}
          onClick={handleSubmit}
          className="w-full font-semibold bg-accent hover:bg-pink-500 dark:hover:bg-pink-600 text-white focus:ring-pink-500 transition-colors"
        >
          {isLoading && "Processing Payment..."}
          {isFetchingTierDetails && "Loading Details..."}
          {!isLoading && !isFetchingTierDetails && (
            `Pay S$${selectedTierDetails ? selectedTierDetails.tierPrice : '0.00'}`
          )}
        </Button>
        {message && (
          <div
            id="payment-message"
            className={`mt-4 p-3 rounded-md text-sm ${
              message.includes("succeeded") || message.includes("Payment succeeded!")
              ? "bg-success/20 text-green-700 dark:bg-green-800/30 dark:text-success border border-success"
              : message.includes("not successful") || message.includes("error") || message.includes("not found") || message.includes("not available")
              ? "bg-error/20 text-red-700 dark:bg-red-800/30 dark:text-error border border-error"
              : "bg-blue-100/80 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300 border border-blue-300"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
