import { useApi } from "@/hooks/useApi";
import { useAppDispatch } from "../redux/hooks";

export const useGuide = () => {
    const dispatch = useAppDispatch();
    const api = useApi();

    const createGuide = async (data: any) => {
        try {
            const files = ["tourism_license", "registration_certificate", "avatar"];
            let formData = new FormData();
            Object.keys(data).map((key: any) => {
                if (files.includes(key)) {
                     formData.append(key, data[key][0]);
                } else if (key === "expertise") {
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

    return {
        createGuide
    };

};