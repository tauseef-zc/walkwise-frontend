import { useApi } from "@/hooks/useApi";
import { useCallback } from "react";

const useData = () => {
  const api = useApi();

  const getFeaturedTours = useCallback(async () => {
    try {
      const response = await api.get("/featured-tours");
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [api]);

  const getTourCategories = useCallback(async () => {
    try {
      const response = await api.get("/tour-categories");
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [api]);

  return {
    getFeaturedTours,
    getTourCategories
  };
};

export default useData;