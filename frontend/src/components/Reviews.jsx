import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Reviews({ rating, reviewCount }) {
  let starsCount = parseInt(rating);
  let halfStar = rating - starsCount;
  let EmptyStars = 5 - halfStar - starsCount;
 

  return (
    <div className="reviews flex gap-2 items-center">
      <div className="flex">
        {Array.from({ length: starsCount }).map((i, index) => (
          <FaStar key={`i${index}`} className=" text-orange-500" />
        ))}

        {halfStar > 0 && (
          <FaStarHalfAlt
            key={`j${reviewCount}${rating}`}
            className=" text-orange-500"
          />
        )}

        {Array.from({ length: EmptyStars }).map((i, index) => (
          <FaRegStar key={`k${index}`} className=" text-orange-500" />
        ))}
      </div>
      <span className="text-sm text-gray-600">({reviewCount})</span>
    </div>
  );
}

export default Reviews;
