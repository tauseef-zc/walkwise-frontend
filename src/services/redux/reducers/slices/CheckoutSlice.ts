"use client";
import { Checkout } from "@/services/app/CheckoutService";
import { createSlice } from "@reduxjs/toolkit";

export interface CheckoutState {
  checkout: Checkout | {};
  tempCheckout: Checkout | {};
}

const getLocalStorageData = (key: string) => {
  try {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) ?? "{}");
    }
  } catch (error) {
    console.warn("Failed to access localStorage:", error);
    return null;
  }
};


const initialState: CheckoutState = {
  checkout: getLocalStorageData("checkout") || {},
  tempCheckout: getLocalStorageData("tmp_checkout") || {},
};

const CheckoutProcess = createSlice({
  name: "gettingTourCategories",
  initialState,
  reducers: {
    setCheckout: (state, action) => {
      state.checkout = action.payload;
      localStorage.setItem("checkout", JSON.stringify(state.checkout));
    },
    updateCheckout: (state, action) => {
      state.checkout = { ...state.checkout, ...action.payload };
      localStorage.setItem("checkout", JSON.stringify(state.checkout));
    },
    clearCheckout: (state, action) => {
      state.checkout = {};
      localStorage.removeItem("checkout");
    },
    setTempCheckout: (state, action) => {
      state.tempCheckout = action.payload;
      localStorage.setItem("tmp_checkout", JSON.stringify(state.tempCheckout));
    },
    updateTempCheckout: (state, action) => {
      state.tempCheckout = { ...state.tempCheckout, ...action.payload };
      localStorage.setItem("tmp_checkout", JSON.stringify(state.tempCheckout));
    },
    clearTempCheckout: (state) => {
      state.tempCheckout = {};
      localStorage.removeItem("tmp_checkout");
    },
    convertTempToCheckout: (state) => {
      state.checkout = state.tempCheckout;
      state.tempCheckout = {};
      localStorage.removeItem("tmp_checkout");
      localStorage.setItem("checkout", JSON.stringify(state.checkout));
    },
  },
});

export const {
  setCheckout,
  updateCheckout,
  clearCheckout,
  setTempCheckout,
  updateTempCheckout,
  clearTempCheckout,
  convertTempToCheckout,
} = CheckoutProcess.actions;

export default CheckoutProcess.reducer;
