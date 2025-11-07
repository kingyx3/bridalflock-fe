import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, maxRating = 5, starClassName = "text-accent", emptyStarClassName = "text-neutral-medium dark:text-neutral-500" }) => {
  const filledStars = Math.ceil(rating);
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <FaStar
            key={starNumber}
            className={`cursor-pointer ${starNumber <= filledStars ? starClassName : emptyStarClassName}`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
