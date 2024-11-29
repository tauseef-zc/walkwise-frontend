import { GuestsObject, Tour, TourDates } from "@/data/tours";
import { useApi } from "@/hooks/useApi";

export interface Checkout {
  tour: Tour;
  guests: GuestsObject;
  dates: TourDates;
  user?: any;
  totalGuests: number;
  tourPrice: number;
  totalPrice: number;
  billingDetails?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }
}

const useCheckout = () => {
  const api = useApi();

  const getPayment = async (paymentId: string) => {
    try {
      const response = await api.get("/payments/" + paymentId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getPaymentIntent = async (data: any) => {
    try {
      let formData = new FormData();
      Object.keys(data).map((key: any) => {
        if (data[key] instanceof Object) {
            formData.append(key, JSON.stringify(data[key]));
        }else{
            formData.append(key, data[key]);
        }
      });

      const response = await api.post("/payments/create-payment-intent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const confirmPayment = async (paymentId: string) => {
    try {
      const response = await api.get("/payments/confirm/" + paymentId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getPayment,
    getPaymentIntent,
    confirmPayment
  };
};

export default useCheckout;