"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export interface ICategory {
  id: number;
  category: string;
}

export interface TourCategoryState {
  data: ICategory[];
}

const initialState: TourCategoryState = {
  data: [],
};

export const getTourCategory = createAsyncThunk(
  "gettingTourCategories",
  async (response: Promise<AxiosResponse>) => await response
);

const tourCategoryProcess = createSlice({
  name: "gettingTourCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTourCategory.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export default tourCategoryProcess.reducer;
