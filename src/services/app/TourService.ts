import { useApi } from "@/hooks/useApi";

export const useTours = () => {
  const api = useApi();

  const addToWishlist = async (tour_id: number) => {
    try {
      const response = await api.get("/wishlist/" + tour_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const removeFromWishlist = async (tour_id: number) => {
    try {
      const response = await api.delete("/wishlist/" + tour_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    addToWishlist,
    removeFromWishlist,
  };
};
