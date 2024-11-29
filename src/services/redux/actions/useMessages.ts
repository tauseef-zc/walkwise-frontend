"use client";
import { useEffect } from "react";
import { getGuideTours } from "../reducers/slices/GuideToursSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useSearchParams } from "next/navigation";

const useMessages = () => {
  const dispatch = useAppDispatch();
  const searchParameters = useSearchParams();
  const {
    data: tours,
    pagination,
    loading,
  } = useAppSelector((state) => state.guide.tours);

  useEffect(() => {
    if (tours.length === 0 && !loading) {
      dispatch(getGuideTours(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tours]);

  useEffect(() => {
    if (searchParameters.get("page") && !loading) {
      dispatch(getGuideTours(Number(searchParameters.get("page"))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParameters]);

  return { tours, pagination, loading };
};

export default useMessages;
