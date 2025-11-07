import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddReview from "../../components/Services/AddReview";
import Reviews from "../../components/Services/Reviews";
import { useStateProvider } from "../../context/StateContext";
import StarRating from '../StarRating';
import UserAvatar from '../UserAvatar';

function Details({ reviewEligibility }) {
  const [{ serviceData }] = useStateProvider();
  const sellerAverageRatingNum = serviceData && serviceData.averageRating !== undefined ? parseFloat(serviceData.averageRating) : NaN;
  const displaySellerRating = !isNaN(sellerAverageRatingNum) ? sellerAverageRatingNum.toFixed(1) : "N/A";
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (serviceData && Array.isArray(serviceData.images) && serviceData.images.length > 0) {
      setCurrentImage(serviceData.images[0]);
    } else if (serviceData) { // If images is empty or not an array, but serviceData exists
      setCurrentImage(""); // Or some default placeholder image URL
    }
  }, [serviceData]);

  return (
    <>
      {serviceData && (
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light mb-1 md:text-3xl">
            {serviceData.title}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <UserAvatar user={serviceData.createdBy || null} size={30} />
            <div className="flex gap-2 items-center">
              <h4 className="text-neutral-dark dark:text-neutral-light font-bold">
                {serviceData.createdBy?.fullName || 'Seller Name Not Available'}
              </h4>
              <h6 className="text-neutral-medium dark:text-neutral-light">@{serviceData.createdBy?.userName || 'N/A'}</h6>
            </div>
            <div className="flex items-center gap-1">
              <StarRating rating={serviceData.reviewsCount > 0 ? (serviceData.ratingSum / serviceData.reviewsCount) : 0} />
              <span className="text-yellow-500">
                {serviceData.reviewsCount > 0 ? (serviceData.ratingSum / serviceData.reviewsCount).toFixed(1) : "0.0"}
              </span>
              <span className="text-[#27272a] dark:text-gray-300">
                ({serviceData.reviewsCount !== undefined ? serviceData.reviewsCount : 0})
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {currentImage && ( // Render image only if currentImage is not empty
              // Container for the main image, ensuring it's square and responsive
              <div className="relative w-full aspect-square max-w-[500px] md:max-w-[600px] mx-auto overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={currentImage}
                  alt="Service"
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-110 transition-all duration-500"
                  priority // Good to add for LCP images
                />
              </div>
            )}
            <div className="flex gap-4 flex-wrap justify-center mt-2">
              {Array.isArray(serviceData.images) && serviceData.images.length > 1 &&
                serviceData.images.map((image) => (
                  // Container for thumbnail, ensuring it's square
                  <div key={image} className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-md overflow-hidden cursor-pointer shadow-md">
                    <Image
                      src={image}
                      alt="service thumbnail"
                      layout="fill"
                      objectFit="cover"
                      onClick={() => setCurrentImage(image)}
                      className={`${
                        currentImage === image ? "ring-2 ring-accent-blue" : "opacity-70 hover:opacity-100"
                      } transition-all duration-300`}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-6"> {/* Added margin-top for better spacing */}
            <h3 className="text-2xl md:text-3xl my-5 font-semibold text-neutral-dark dark:text-neutral-light"> {/* Adjusted font size and weight */}
              About this service
            </h3>
            <div className="text-neutral-dark dark:text-neutral-light prose prose-sm md:prose-base max-w-none"> {/* Tailwind CSS prose for typography */}
              <p>{serviceData.description}</p>
            </div>
          </div>
          {/* About the seller */}
          <div className="mt-8"> {/* Added margin-top */}
            <h3 className="text-2xl md:text-3xl my-5 font-semibold text-neutral-dark dark:text-neutral-light"> {/* Adjusted font size and weight */}
              About the Seller
            </h3>
            <div className="flex flex-col sm:flex-row sm:gap-6 items-center sm:items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800"> {/* Added padding, border, bg */}
              <div className="mb-4 sm:mb-0 flex-shrink-0"> {/* Prevent shrinking */}
                <UserAvatar user={serviceData.createdBy || null} size={100} mdSize={120} /> {/* Responsive avatar size */}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col xs:flex-row gap-x-2 items-baseline"> {/* Align items baseline */}
                  <h4 className="font-semibold text-xl text-neutral-dark dark:text-neutral-light"> {/* Adjusted font size and weight */}
                    {serviceData.createdBy?.fullName || 'Seller Name Not Available'}
                  </h4>
                  <span className="text-neutral-medium dark:text-neutral-medium text-sm">
                    @{serviceData.createdBy?.userName || 'N/A'}
                  </span>
                </div>
                <div className="text-neutral-dark dark:text-neutral-light prose prose-sm max-w-none mt-1"> {/* Tailwind CSS prose */}
                  <p>{serviceData.createdBy?.description || "No description provided."}</p> {/* Fallback for description */}
                </div>
                <div className="flex items-center gap-1 mt-2"> {/* Added margin-top */}
                  <StarRating rating={!isNaN(sellerAverageRatingNum) ? sellerAverageRatingNum : 0} />
                  <span className="text-yellow-500 font-semibold"> {/* Ensure yellow color for rating value */}
                    {displaySellerRating}
                  </span>
                  <span className="text-neutral-medium dark:text-neutral-medium">
                    ({serviceData.totalReviews !== undefined ? serviceData.totalReviews : 0} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Reviews />
          <AddReview reviewEligibility={reviewEligibility} />
        </div>
      )}
    </>
  );
}

export default Details;
