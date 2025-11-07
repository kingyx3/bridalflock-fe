import { useStateProvider } from "../../context/StateContext";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

function Reviews() {
  const [{ serviceData }] = useStateProvider();

  // Calculate average rating directly for display
  const calculatedAverageRating = serviceData && serviceData.reviewsCount > 0 ? (serviceData.ratingSum / serviceData.reviewsCount) : 0;
  const displayAverageRating = calculatedAverageRating.toFixed(1);

  return (
    <>
      {serviceData && (
        <div className="mb-10">
          <h3 className="text-2xl my-5 font-normal text-neutral-dark dark:text-neutral-light">Reviews</h3>
          <div className="flex gap-3 mb-5 items-center"> {/* Added items-center for better alignment */}
            <h5 className="dark:text-neutral-light">{serviceData.reviews.length} reviews for this Service</h5>
            <div className="flex text-warning items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${Math.ceil(calculatedAverageRating) >= star
                      ? "text-warning"
                      : "text-neutral-medium/70 dark:text-neutral-medium"
                      }`} // Used calculatedAverageRating
                  />
                ))}
              </div>
              <span className="dark:text-warning">{displayAverageRating}</span> {/* Used displayAverageRating */}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {serviceData.reviews.map((review) => (
              <div className="flex gap-3 border-t dark:border-neutral-medium pt-6" key={review.id}>
                <div>
                  {review.reviewer.avatar ? (
                    <Image
                      src={review.reviewer.avatar}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                      <span className="text-xl text-white">
                        {review.reviewer.email[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="dark:text-neutral-light">{review.reviewer.fullName}</h4>
                  <div className="flex text-warning items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${review.rating >= star
                            ? "text-warning"
                            : "text-neutral-medium/70 dark:text-neutral-medium"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="dark:text-warning">{review.rating}</span> {/* Ensure rating number is also visible */}
                  </div>
                  <p className="text-neutral-dark dark:text-neutral-light pr-20">{review.reviewText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Reviews);
