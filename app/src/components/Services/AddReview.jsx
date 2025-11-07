import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addReview as callAddReviewApi } from "../../utils/api";

function AddReview({ reviewEligibility }) {
  const [{ serviceData, user }, dispatch] = useStateProvider();
  const [data, setData] = useState({ reviewText: "", rating: 0 });
  const router = useRouter();
  const { serviceId } = router.query;

  const handleAddReview = async () => {
    if (!serviceId || !data.reviewText || data.rating === 0) {
      // Basic validation, can be enhanced
      alert("Please provide a review text and a rating.");
      return;
    }
    try {
      // The addReview cloud function already handles auth and eligibility server-side,
      // but client-side check provides immediate feedback.
      const newReview = await callAddReviewApi({ serviceId: serviceId, ...data });

      if (newReview) {
        setData({ reviewText: "", rating: 0 });
        // Dispatch to update the UI optimistically or refetch reviews
        dispatch({
          type: reducerCases.ADD_REVIEW,
          newReview: { ...newReview, reviewerId: user.uid, serviceId: serviceId, createdAt: new Date().toISOString() },
        });
        // Potentially refetch serviceData to get all reviews again if ADD_REVIEW doesn't fully update the list
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(`Failed to submit review: ${err.message || "Please try again."}`);
    }
  };

  if (!reviewEligibility) {
    return <div className="mb-10 p-4 text-neutral-medium dark:text-neutral-light">Loading review eligibility...</div>;
  }

  if (reviewEligibility.loading) {
    return <div className="mb-10 p-4 text-neutral-medium dark:text-neutral-light">Checking review eligibility...</div>;
  }

  if (!reviewEligibility.eligible) {
    let message = "You are not eligible to review this service at this time.";
    switch (reviewEligibility.reason) {
      case "NOT_ORDERED_OR_COMPLETED":
        message = "You need to purchase and have this service delivered to write a review.";
        break;
      case "WINDOW_EXPIRED":
        message = "The 2-day window to review this service has expired.";
        break;
      case "MISSING_COMPLETION_DATE":
        message = "Cannot determine review eligibility due to missing completion date for the order.";
        break;
      case "ERROR_CHECKING_ELIGIBILITY":
        message = "Could not determine review eligibility at this time. Please try again later.";
        break;
      case "NOT_LOGGED_IN":
        message = "Please log in to submit a review.";
        break;
    }
    return (
      <div className="mb-10 p-4 bg-warning/30 dark:bg-warning/40 border-l-4 border-warning dark:border-warning text-yellow-600 dark:text-yellow-100">
        <p>{message}</p>
      </div>
    );
  }

  // User is eligible, render the form
  return (
    <div className="mb-10">
      <h3 className="text-2xl my-5 font-normal text-neutral-dark dark:text-neutral-light">
        Leave a Review for {serviceData?.title || "this service"}
      </h3>

      <div className="flex flex-col items-start justify-start gap-3">
        <textarea
          name="reviewText"
          id="reviewText"
          onChange={(e) => setData({ ...data, reviewText: e.target.value })}
          value={data.reviewText}
          className="block p-2.5 w-full md:w-4/6 text-sm text-neutral-dark bg-neutral-light dark:text-neutral-light dark:bg-neutral-dark rounded border border-neutral-medium/70 dark:border-neutral-medium focus:ring-primary focus:border-primary dark:placeholder-neutral-medium"
          placeholder="Share your experience with this service..."
          rows="4"
        ></textarea>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`cursor-pointer text-2xl ${
                data.rating >= num ? "text-warning" : "text-neutral-medium/70 dark:text-neutral-medium"
              }`}
              onClick={() => setData({ ...data, rating: num })}
            />
          ))}
        </div>
        <button
          className="flex items-center bg-accent hover:bg-pink-500 dark:hover:bg-pink-600 text-white py-2.5 px-6 justify-center text-md font-semibold rounded transition-colors disabled:opacity-50"
          onClick={handleAddReview} // Corrected onClick handler
          disabled={!data.reviewText || data.rating === 0} // Basic disable condition
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default AddReview;
