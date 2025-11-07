import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaStar } from "react-icons/fa";

function SearchGridItem({ service, searchDate }) {
  const router = useRouter();

  const calculateRatings = () => {
    const { reviews } = service;
    let rating = 0;
    if (!reviews?.length) return 0;
    reviews.forEach((review) => {
      rating += review.rating;
    });
    return (rating / reviews.length).toFixed(1);
  };

  return (
    <div
      className="flex flex-col gap-2 p-3 cursor-pointer mb-8 bg-neutral-light dark:bg-neutral-dark rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-neutral-medium/30 dark:border-neutral-medium"
      onClick={() =>
        router.push(`/service/${service.id}?searchDate=${searchDate}`)
      }
    >
      <div className="relative w-full h-40">
        <Image
          src={service.images?.[0] || "/fallback.jpg"}
          alt="service"
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div>
          {service.createdBy?.avatar ? (
            <Image
              src={service.createdBy.avatar}
              alt="profile"
              height={30}
              width={30}
              className="rounded-full"
            />
          ) : (
            <div className="bg-primary h-7 w-7 flex items-center justify-center rounded-full relative">
              <span className="text-lg text-primary-darker dark:text-white">
                {service.createdBy?.email?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
          )}
        </div>
        <span className="text-md text-neutral-dark dark:text-neutral-light">
          <strong className="font-medium">
            {service.createdBy?.userName || "Unknown"}
          </strong>
        </span>
      </div>
      <div>
        <p className="line-clamp-2 text-neutral-dark dark:text-neutral-light hover:underline">
          {service.title}
        </p>
      </div>
      <div className="flex items-center gap-1 text-warning">
        <FaStar />
        <span>
          <strong className="font-medium text-neutral-dark dark:text-neutral-light">
            {calculateRatings()}
          </strong>
        </span>
        <span className="text-neutral-medium dark:text-neutral-light">
          ({service.reviews?.length ?? 0})
        </span>
      </div>
      <div>
        {service.tiers && service.tiers.length > 0 && service.tiers[0] ? (
          <>
            <strong className="font-medium text-neutral-dark dark:text-neutral-light">
              From ${service.tiers[0].tierPrice !== undefined && service.tiers[0].tierPrice !== null ? service.tiers[0].tierPrice : "N/A"}
            </strong>
          </>
        ) : (
          <strong className="font-medium text-neutral-dark dark:text-neutral-light">Price not available</strong>
        )}
      </div>
    </div>
  );
}

export default SearchGridItem;
