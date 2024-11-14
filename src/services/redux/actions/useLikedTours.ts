"use client";
import { useEffect } from "react";
import { getLikedTours } from "../reducers/slices/LikedToursSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useSearchParams } from "next/navigation";

const useLikedTours = () => {
  const dispatch = useAppDispatch();
  const searchParameters = useSearchParams();
  const {
    data: tours,
    pagination,
    loading,
  } = useAppSelector((state) => state.user.liked_tours);

  useEffect(() => {
    if (tours.length === 0 && !loading) {
      dispatch(getLikedTours(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tours]);

  useEffect(() => {
    if (searchParameters.get("page") && !loading) {
      dispatch(getLikedTours(Number(searchParameters.get("page"))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParameters]);

  const refresh = () =>
    dispatch(getLikedTours(Number(searchParameters.get("page")) ?? 1));

  console.log({ tours, pagination, loading });

  return { tours, pagination, loading, refresh };
};

export default useLikedTours;
