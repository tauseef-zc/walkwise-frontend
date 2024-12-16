"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import FiveStartIconForRate from "../common/partials/FiveStartIconForRate";
import { useApi } from "@/hooks/useApi";
import ButtonPrimary from "../shared/ButtonPrimary";
import { Booking } from "@/data/types";

interface TourReviewFormProps {
  booking: Booking;
}

const TourReviewForm: React.FC<TourReviewFormProps> = ({ booking }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [guideRating, setGuideRating] = useState<number>(0);
  const [guideReview, setGuideReview] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { post } = useApi();

  const reset = () => {
    setRating(0);
    setReview("");
    setGuideRating(0);
    setGuideReview("");
  };

  const submitReview = async (data: any) => {
    await post("/reviews", data);
    setMessage("Review submitted successfully");
    setLoading(false);
    reset();

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating && !review && !guideRating && !guideReview) {
      return;
    }

    const data = {
      guide_id: booking.tour.user.id,
      tour_id: booking.tour.id,
      booking_id: booking.id,
      tour_rating: rating,
      tour_review: review,
      guide_rating: guideRating,
      guide_review: guideReview,
    };

    setLoading(true);
    submitReview(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg dark:bg-neutral-800">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Review Form</h2>
      </div>
      {/* Tour Guide Section */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt={`Tauseef's avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Tauseef</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tour Guide</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Rate the Guide
        </label>
        <div className="flex space-x-2 mt-1">
          <FiveStartIconForRate
            defaultPoint={guideRating}
            onChange={(point) => setGuideRating(point)}
          />
        </div>
      </div>
      <div className="mb-4 border-b border-gray-200 "></div>
      <h3 className="text-lg font-medium mb-4 dark:text-white">Tour Review</h3>
      {/* Tour Info Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">{booking.tour.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Category: {booking.tour.category.category}
        </p>
      </div>

      {/* Rating and Review Form */}
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Rating
          </label>
          <div className="flex space-x-2 mt-1">
            <FiveStartIconForRate
              defaultPoint={rating}
              onChange={(point) => setRating(point)}
            />
          </div>
        </div>

        {/* Review */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none dark:bg-neutral-800 dark:text-white"
            placeholder="Write your review here..."
          />
        </div>

        {message && (
          <div className="mb-4">
            <p className="text-green-700 rounded-md text-sm bg-green-100 p-3 border border-green-700">
              {message}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <ButtonPrimary type="submit" loading={loading}>
          Submit Review
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default TourReviewForm;
