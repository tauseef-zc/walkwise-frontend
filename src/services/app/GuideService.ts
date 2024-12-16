import { useApi } from "@/hooks/useApi";

export const useGuide = () => {
    const api = useApi();

    const createGuide = async (data: any) => {
        try {
            const files = ["tourism_license", "registration_certificate", "avatar"];
            let formData = new FormData();
            Object.keys(data).map((key: any) => {
                if (files.includes(key)) {
                     formData.append(key, data[key][0]);
                } else if (key === "expertise" || key === "other_lang") {
                    formData.append(key, JSON.stringify(data[key]));    
                }else{
                    formData.append(key, data[key]);
                }
            });            
            const response = await api.post("/guides/register", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return response.data;
        } catch (error) {
            throw error;
        }    
    };

    const createTour = async (data: any) => {
        try {
            const response = await api.post("/guides/tours/create", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return response.data;
        } catch (error) {
            throw error;
        }    
    };
    
    const updateTour = async (id: number , data: any) => {
        try {
            const response = await api.post("/guides/tours/update/" + id, data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return response.data;
        } catch (error) {
            throw error;
        }    
    };

    const getDashboardStats = async () => {
      try {
        const response = await api.get("/guides/dashboard");
        return response;
      } catch (error) {
        throw error;
      }
    };

    return {
      createGuide,
      createTour,
      updateTour,
      getDashboardStats,
    };

};