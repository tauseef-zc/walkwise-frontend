"use client";
import CommentListing from "@/components/common/partials/CommentListing";
import FiveStartIconForRate from "@/components/common/partials/FiveStartIconForRate";
import ButtonCircle from "@/components/shared/ButtonCircle";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Input from "@/components/shared/Input";
import { Tour, TourReview } from "@/data/tours";
import { useApi } from "@/hooks/useApi";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";

const Review = ({ tour }: { tour: Tour }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [reviews, setReviews] = React.useState<TourReview[]>([]);
  const [comment, setComment] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);
  const [showCount, setShowCount] = React.useState<number>(4);
  const [message, setMessage] = React.useState<string>("");
  const { post } = useApi();

  const reset = () => {
    setRating(0);
    setComment("");
    setLoading(false);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const submitReview = async (data: any) => {
    const response = await post("/reviews", data);
    return await response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating && !comment) {
      return;
    }

    setLoading(true);

    const data = {
      tour_id: tour.id,
      tour_rating: rating,
      tour_review: comment,
      booking_id: tour.user_booking?.id,
    };

    const response = await submitReview(data);
    setReviews((state) => [response.tourReview as TourReview, ...state]);
    setMessage("Review submitted successfully");
    reset();
  };

  useEffect(() => {
    if (tour.reviews) {
      setReviews(tour.reviews);
    }
  }, [tour]);

  return (
    <div className="listingSection__wrap">
      {/* HEADING */}
      <h2 className="text-2xl font-semibold">
        Reviews {reviews.length > 0 ? `(${reviews.length} reviews)` : ""}
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {reviews.length === 0 && (
        <div className="space-y-5">
          <div className="text-md text-neutral-500 dark:text-neutral-400">
            No reviews yet.
          </div>
        </div>
      )}

      {/* Content */}
      {tour.has_booking && (
        <div className="space-y-5">
          <FiveStartIconForRate
            defaultPoint={rating}
            onChange={setRating}
            iconClass="w-6 h-6"
            className="space-x-0.5"
          />
          <div className="relative">
            <Input
              value={comment}
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
              onChange={(e) => setComment(e.target.value)}
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
              onClick={handleSubmit}
              disabled={loading}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>

          {message && (
            <p className="text-green-700 rounded-md text-sm bg-green-100 p-3 border border-green-700">
              {message}
            </p>
          )}
        </div>
      )}

      {reviews.length > 0 && (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {reviews.slice(0, showCount).map((review, index) => (
            <CommentListing
              key={index}
              className="py-8 "
              data={review}
            />
          ))}
          {showCount !== reviews.length && (
            <div className="pt-8">
              <ButtonSecondary
                onClick={() => {
                  if (showCount + 4 < reviews.length) {
                    setShowCount(showCount + 4);
                  } else {
                    setShowCount(reviews.length);
                  }
                }}
              >
                View more reviews
              </ButtonSecondary>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Review;
