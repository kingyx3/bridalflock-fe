import React from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useStateProvider } from "../../context/StateContext";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Pricing({ searchDate }) {
  const [{ serviceData, user }, dispatch] = useStateProvider();
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    if (serviceData?.tiers && serviceData.tiers.length > 0) {
      setSelectedTier(serviceData.tiers[0]);
    }
  }, [serviceData]);

  if (!serviceData?.tiers || serviceData.tiers.length === 0) {
    return (
      <div className="lg:col-span-1 w-full lg:sticky lg:top-36 mb-10 h-max">
        <div className="bg-white dark:bg-neutral-dark border dark:border-neutral-medium p-6 sm:p-8 md:p-10 flex flex-col gap-5 rounded-lg shadow-sm">
          <p className="text-neutral-medium dark:text-neutral-light">Pricing information not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 w-full lg:sticky lg:top-36 mb-10 h-max flex flex-col gap-4">
      {serviceData.tiers.map((tier) => {
        const tierPrice = tier.tierPrice !== undefined && tier.tierPrice !== null ? tier.tierPrice : '0';
        const tierDurationHours = tier.tierDurationHours !== undefined && tier.tierDurationHours !== null ? tier.tierDurationHours : 'N/A';
        const shortDesc = tier.tierName || tier.tierDescription || "N/A";
        const revisions = tier.revisions !== undefined && tier.revisions !== null ? `${tier.revisions} Revisions` : "N/A Revisions";
        const features = tier.tierInclusions || [];
        const isSelected = selectedTier?.id === tier.id;

        return (
          <div
            key={tier.id}
            role="button" // Added for accessibility and testability
            tabIndex={0}  // Added for accessibility
            className={`bg-white dark:bg-neutral-dark border p-6 sm:p-8 md:p-10 flex flex-col gap-5 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent ${
              isSelected ? "border-accent dark:border-accent ring-2 ring-accent dark:ring-accent" : "border-neutral-medium dark:border-neutral-medium hover:border-neutral-strong dark:hover:border-neutral-light"
            }`}
            onClick={() => setSelectedTier(tier)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedTier(tier); }} // Added for keyboard accessibility
          >
            <div className="flex justify-between">
              <h4 className="text-md font-normal text-neutral-medium dark:text-neutral-light">
                {shortDesc}
              </h4>
              <h6 className="font-medium text-lg dark:text-neutral-light">${tierPrice}</h6>
            </div>
            <div>
              <div className="text-neutral-medium dark:text-neutral-light font-semibold text-sm flex flex-col sm:flex-row sm:gap-6 items-start sm:items-center">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <FiClock className="text-xl" />
                  <span>{tierDurationHours} Hours Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiRefreshCcw className="text-xl" />
                  <span>{revisions}</span>
                </div>
              </div>
            </div>
            <ul className="flex gap-1 flex-col">
              {features.map((inclusion) => (
                <li key={inclusion.id || inclusion.label} className="flex items-center gap-3">
                  <BsCheckLg className="text-success text-lg" />
                  <span className="text-neutral-dark dark:text-neutral-light">{inclusion.label}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {serviceData.userId === user?.uid ? (
        <button
          className="flex items-center bg-accent hover:bg-pink-500 dark:hover:bg-pink-600 text-white py-2 justify-center font-bold text-lg relative rounded transition-colors mt-4"
          onClick={() => router.push(`/seller/services/${serviceData.id}`)}
        >
          <span>Edit</span>
          <BiRightArrowAlt className="text-2xl absolute right-4" />
        </button>
      ) : (
        <button
          className="flex items-center bg-accent hover:bg-pink-500 dark:hover:bg-pink-600 text-white py-2 justify-center font-bold text-lg relative rounded transition-colors mt-4"
          onClick={() => {
            if (selectedTier) {
              router.push(
                `/checkout?serviceId=${serviceData.id}&tierId=${selectedTier.id}&serviceDate=${searchDate}`
              );
            } else {
              // Handle the case where no tier is selected, maybe show an alert or disable the button
              alert("Please select a tier to continue.");
            }
          }}
          disabled={!selectedTier}
        >
          <span>Continue</span>
          <BiRightArrowAlt className="text-2xl absolute right-4" />
        </button>
      )}
    </div>
  );
}

export default Pricing;
