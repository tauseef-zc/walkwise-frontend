"use client";
import api from "@/lib/restApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ICategory {
  id: number;
  category: string;
  slug: string;
  info?: string;
  image: string;
  tours_count?: number;
}

export interface TourCategoryState {
  data: ICategory[];
}

const initialState: TourCategoryState = {
  data: [],
};

export const getTourCategory = createAsyncThunk(
  "gettingTourCategories",
  async () => await api.get("/tour-categories")
);

const tourCategoryProcess = createSlice({
  name: "gettingTourCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTourCategory.fulfilled, (state, action: any) => {
      state.data = action.payload;
    });
  },
});

export default tourCategoryProcess.reducer;
