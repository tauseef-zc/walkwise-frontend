import { useApi } from "@/hooks/useApi";
import { useAppDispatch } from "../redux/hooks";

export const useTraveler = () => {
  const dispatch = useAppDispatch();
  const api = useApi();

  const createTraveler = async (data: any) => {
    try {
      let formData = new FormData();
      const files = ["passport_image", "avatar"];
      const jsonFields = ["accessibility", "interests", "other_lang", "emergency_contact"];
      
      Object.keys(data).map((key: any) => {
        if (files.includes(key)) {
          formData.append(key, data[key][0]);
        } else if (jsonFields.includes(key)) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await api.post("/travelers/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    createTraveler,
  };
};
