"use client";
import { useEffect } from 'react'
import { getTourCategory } from '../reducers/slices/TourCategorySlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const useTourCategory = () => {

  const dispatch = useAppDispatch();
  const {data: categories} = useAppSelector((state) => state.site_data.categories);
  
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getTourCategory());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return { categories };

}

export default useTourCategory;
