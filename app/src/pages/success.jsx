import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Success() {
  const router = useRouter();
  const { payment_intent } = router.query;

  useEffect(() => {
    if (payment_intent) {
      // Log payment_intent if present for debugging
      console.log("Payment intent received on success page:", payment_intent);
    } else {
      console.log("Success page loaded without payment_intent query parameter.");
    }
    // Always redirect to buyer orders page after a delay.
    // Order confirmation is handled by the Stripe webhook, and status will be reflected there.
    setTimeout(() => router.push("/buyer/orders"), 3000);
  }, [payment_intent, router]);

  return (
    <div className="h-screen flex items-center justify-center text-center p-6 sm:p-10 md:p-20 flex-col bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
        Payment Authorized! Your Order is Awaiting Seller Approval.
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300">
        The seller has been notified. You will be redirected to your orders page shortly.
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-2">
        You can check the status of your order there. Please do not close this page.
      </p>
    </div>
  );
}

export default Success;
