import React, { useEffect, useState } from "react";
import Pricing from "../../components/Services/Pricing";
import Details from "../../components/Services/Details";
import { useRouter } from "next/router";
import { getService, hasUserOrderedServiceDirectly, isReviewEligible } from "../../utils/api"; // Import isReviewEligible

import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";

function ServicePage() {
  const router = useRouter();
  const { serviceId, searchDate } = router.query;
  const [{ serviceData, user }, dispatch] = useStateProvider();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewEligibility, setReviewEligibility] = useState({ eligible: false, reason: null, loading: true });

  useEffect(() => {
    dispatch({ type: reducerCases.SET_SERVICE_DATA, serviceData: undefined });
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    const fetchServiceData = async () => {
      // Add the guard for serviceId
      if (!serviceId || typeof serviceId !== "string") {
        if (isMounted) {
          setLoading(false);
          setError("Service ID is invalid.");
        }
        return;
      }
      if (isMounted) {
        setLoading(true); // Call setLoading(true) only after the check
        setError(null);
      }
      try {
        const service = await getService(serviceId);
        if (isMounted) {
          dispatch({ type: reducerCases.SET_SERVICE_DATA, serviceData: service });
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) {
          setError("Failed to load service details. Please try again later.");
          setLoading(false);
        }
      }
    };
    // The fetchServiceData function now handles the serviceId check internally.
    fetchServiceData();
    return () => {
      isMounted = false;
    };
  }, [serviceId, dispatch]);

  // useEffect to check review eligibility
  useEffect(() => {
    const fetchReviewEligibility = async () => {
      // Modify the condition to be more robust
      if (typeof serviceId === "string" && user?.uid) {
        setReviewEligibility({ eligible: false, reason: null, loading: true }); // Reset on change
        try {
          // Assuming isReviewEligible is generic enough or will be updated separately.
          // For this file, only the parameter name changes.
          const result = await isReviewEligible(user.uid, serviceId);
          setReviewEligibility({ ...result, loading: false });
        } catch (err) {
          console.error("Error checking review eligibility:", err);
          setReviewEligibility({ eligible: false, reason: "ERROR_CHECKING_ELIGIBILITY", loading: false });
        }
      } else if (!user?.uid) {
        // Not logged in, so not eligible and not loading
        setReviewEligibility({ eligible: false, reason: "NOT_LOGGED_IN", loading: false });
      }
    };

    fetchReviewEligibility();
  }, [serviceId, user?.uid]);

  useEffect(() => {
    let isMounted = true;
    const checkOrder = async () => {
      // Modify the condition to be more robust
      if (user?.uid && typeof serviceId === "string") {
        try {
          const ordered = await hasUserOrderedServiceDirectly(serviceId, user.uid);
          if (isMounted) {
            dispatch({
              type: reducerCases.HAS_USER_ORDERED_SERVICE,
              hasOrdered: ordered,
            });
          }
        } catch (error) {
          console.error("Error checking if service was ordered:", error);
          if (isMounted) {
            dispatch({
              type: reducerCases.HAS_USER_ORDERED_SERVICE,
              hasOrdered: false,
            });
          }
        }
      } else {
        if (isMounted) {
          dispatch({
            type: reducerCases.HAS_USER_ORDERED_SERVICE,
            hasOrdered: false,
          });
        }
      }
    };

    checkOrder();
    return () => {
      isMounted = false;
    };
  }, [serviceId, user, dispatch]);

  if (loading) {
    return <p className="container mx-auto px-4 py-8 text-center">Loading service details...</p>;
  }

  if (error) {
    return <p className="container mx-auto px-4 py-8 text-center text-red-600">{error}</p>;
  }

  return (
    <>
      {serviceData ? (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8"> {/* Use container for max-width and centering, add padding */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
            <Details reviewEligibility={reviewEligibility} /> {/* Pass reviewEligibility here */}
            <Pricing searchDate={searchDate} />
          </div>
        </div>
      ) : (
        // This case might occur if loading is false, no error, but serviceData is still undefined.
        // Could be an initial state or if fetchServiceData completes but serviceData isn't set properly (though current logic should prevent this).
        <p className="container mx-auto px-4 py-8 text-center">Service details are not available.</p>
      )}
    </>
  );
}

export default ServicePage;
