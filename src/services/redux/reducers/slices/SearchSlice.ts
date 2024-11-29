"use client";
import { PlaceResult } from "@/components/inputs/LocationInput";
import { GuestsObject } from "@/data/tours";
import { createSlice } from "@reduxjs/toolkit";

export interface SearchDate {
    from: Date | null;
    to: Date | null
}

export interface SearchState {
  data: {
    location: PlaceResult | null;
    dates: SearchDate | {};
    guests: GuestsObject;
    placeId: string;
  };
}

const initialState: SearchState = {
  data: {
    location: null,
    dates: {},
    guests: {
      guestAdults: 0,
      guestChildren: 0,
      guestInfants: 0,
    },
    placeId: "",
  },
};

const SearchProcess = createSlice({
  name: "updateSearchProcess",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.data = action.payload;
    },

    updateSearch: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },

    clearSearch: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { addSearch, updateSearch, clearSearch } = SearchProcess.actions;

export default SearchProcess.reducer;
