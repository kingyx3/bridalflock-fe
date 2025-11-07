import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useStateProvider } from "../../../context/StateContext";
import { addService } from "../../../utils/api"; // uploadServiceImages removed
import MultiStepServiceForm from "../../../components/Services/MultiStepServiceForm";
// AllValidators, predefinedAddons, getFieldsForCategory might not be needed here if form handles all
// For now, keeping them in case addServiceFE still needs getFieldsForCategory, but ideally not.
// import * as AllValidators from "../../../utils/validators"; // Removed as validation moves to form
// import { predefinedAddons, getFieldsForCategory } from "../../../utils/serviceFieldDefinitions"; // Potentially remove if form prepares all data

function CreateServicePage() {
  const router = useRouter();
  const [{ user, isAuthLoading }] = useStateProvider(); // Assuming isAuthLoading is available

  // Removed: const [files, setFile] = useState([]);
  // Removed: const [data, setData] = useState({...});
  // existingImages is correctly initialized for a create page
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [checkingStripeStatus, setCheckingStripeStatus] = useState(true);


  useEffect(() => {
    // Don't run the effect if auth is still loading or user is not yet defined.
    if (isAuthLoading || user === undefined) {
      setCheckingStripeStatus(true);
      return;
    }

    // If user is null (logged out), _app.jsx handles the redirect
    if (user === null) {
      setCheckingStripeStatus(false);
      return;
    }

    // Now user is loaded and not null, check Stripe status.
    if (user) {
      // More comprehensive check for Stripe onboarding status
      const isOAuthCompleted = !!user.stripeOnboardingCompletedAt;
      // stripeOnboardingComplete is set by webhook: account.charges_enabled && account.details_submitted
      const isAccountOperational = !!user.stripeOnboardingComplete; // Correctly check stripeOnboardingComplete

      // Fallback checks if stripeOnboardingComplete is not yet set (e.g., webhook delay)
      // These fields should also be updated by the account.updated webhook.
      const areChargesEnabled = user.stripeChargesEnabled === true;
      const areDetailsSubmitted = user.stripeDetailsSubmitted === true;

      // Primary condition: OAuth was done AND Stripe confirmed account is operational.
      // Fallback: OAuth was done AND charges are enabled AND details are submitted.
      const isFullyOnboarded = isOAuthCompleted && (isAccountOperational || (areChargesEnabled && areDetailsSubmitted));

      if (isFullyOnboarded) {
        setCheckingStripeStatus(false);
      } else {
        // If not fully onboarded, redirect.
        // Log the specific reason for more clarity if needed for debugging.
        let reason = "incomplete_onboarding";
        if (!isOAuthCompleted) {
            reason = "oauth_not_completed";
        } else if (!isAccountOperational && !(areChargesEnabled && areDetailsSubmitted)) {
            // This block is largely bypassed due to isAccountOperational mirroring isOAuthCompleted.
            // If it were to be entered, these would be the reasons.
            reason = "account_not_operational";
            // Removed: if (user.stripeOnboardingComplete === false) reason = "account_explicitly_not_operational";
            if (user.stripeChargesEnabled === false) reason = "charges_not_enabled";
            else if (user.stripeDetailsSubmitted === false) reason = "details_not_submitted";
        }

        console.warn(`Stripe onboarding not fully completed (OAuth: ${isOAuthCompleted}, ChargesEnabled: ${user.stripeChargesEnabled}, DetailsSubmitted: ${user.stripeDetailsSubmitted}). Redirecting to onboarding with reason: ${reason}`);
        router.push(`/seller/stripe-onboarding?reason=${reason}`);
      }
    }
    // If user is not loaded, the earlier checks for isAuthLoading or user === undefined/null handle it.
    // No explicit 'else' needed here for the user check, as the effect reruns when user loads.
  }, [user, isAuthLoading, router]);

  const addServiceFE = async (serviceDataFromForm) => {
    // Validation is now assumed to be handled by MultiStepServiceForm before calling onSubmit
    // const errorMsg = AllValidators.validateServiceInput({ data, images: files }); // Removed
    // if (errorMsg) { // Removed
    //   setError(errorMsg); // Removed
    //   return; // Removed
    // } // Removed

    setIsSubmitting(true);
    setError("");

    if (!user || !user.uid) {
      setError("User information is not available. Please ensure you are properly logged in and try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userId = user.uid;

      // serviceDataFromForm is expected to contain all necessary data, including image URLs
      // and fields processed as per their definitions (common, category-specific, tiers, addons)
      const finalServiceData = {
        ...serviceDataFromForm, // Spread all data from the form
        userId, // Add/overwrite userId
      };

      // Remove any re-processing of tiers, addons, or other fields if MultiStepServiceForm
      // already prepares them in the exact format needed for the backend.
      // The assumption is serviceDataFromForm.images already contains the image URLs.
      // The assumption is serviceDataFromForm.tiers and serviceDataFromForm.addons are correctly structured.
      // The assumption is serviceDataFromForm contains all common and category-specific fields.

      // If MultiStepServiceForm does not handle getFieldsForCategory logic to include only defined fields,
      // that logic might need to be re-applied here carefully. However, the goal is for the form to manage this.
      // For example, if serviceDataFromForm might contain extra temporary fields used only in the form,
      // they would need to be stripped here or (preferably) not included by MultiStepServiceForm in its output.

      await addService(finalServiceData);
      router.push("/seller/services");
    } catch (err) {
      console.error("Error adding service:", err);
      let errorMessage = "Failed to create service. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || checkingStripeStatus) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading and verifying account status...</p>
        {/* You can add a spinner here */}
      </div>
    );
  }

  // If user is null and not loading, it means redirection to login should have happened or is about to.
  // Or, if stripeOnboardingCompletedAt is missing, redirection to stripe-onboarding should have happened.
  // This explicit return is a fallback, useEffect should handle redirection.
  if (!user || (user && !user.stripeOnboardingCompletedAt)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Create a New Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Showcase your skills and services to potential clients</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
          <MultiStepServiceForm
            user={user} // Pass user
            // data, setData, files, setFile props removed
            existingImages={[]} // For create page, no existing images
            setExistingImages={() => {}} // Should not be called in create
            error={error} // error state from this page
            isSubmitting={isSubmitting || !user || !user.uid} // isSubmitting from this page
            onSubmit={addServiceFE} // The simplified submit handler
            // Removed features and setFeatures props
            // initialData can be implicitly {} for create mode if MultiStepServiceForm handles it
          />
        </div>
      </div>
    </div>
  );
}

export default CreateServicePage;
