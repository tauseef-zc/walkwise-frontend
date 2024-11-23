"use client";
import { useEffect, useState } from "react";
import { getLikedTours } from "../reducers/slices/LikedToursSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useSearchParams } from "next/navigation";
import { set } from "js-cookie";

const useLikedTours = () => {
  const dispatch = useAppDispatch();
  const searchParameters = useSearchParams();
  const [page, setPage] = useState(1);

  const {
    data: tours,
    pagination,
    loading,
  } = useAppSelector((state) => state.user.liked_tours);

  useEffect(() => {
    if (page && !loading) {
      dispatch(getLikedTours(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (searchParameters.get("page") && !loading) {
      setPage(Number(searchParameters.get("page")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParameters]);

  const refresh = () =>
    dispatch(getLikedTours(Number(searchParameters.get("page")) ?? 1));

  return { tours, pagination, loading, refresh };
};

export default useLikedTours;
