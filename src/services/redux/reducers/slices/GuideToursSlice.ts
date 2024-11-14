"use client";
import api from "@/lib/restApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "./TourCategorySlice";

export interface ITour {
  images: any;
  price?: number;
  status?: string;
  id: number;
  title: string;
  slug: string;
  info?: string;
  image?: string;
  tours_count?: number;
  category?: ICategory;
}

export interface GuideTourState {
  loading: boolean;
  data: ITour[];
  pagination?: any;
}

const initialState: GuideTourState = {
  loading: false,
  data: [],
  pagination: {},
};

export const getGuideTours = createAsyncThunk(
  "gettingGuideTours",
  async (page: number) => await api.get("/guides/tours?page=" + page)
);

const GuideTourProcess = createSlice({
  name: "GETTING_GUIDE_TOURS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGuideTours.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.pagination = {};
    });

    builder.addCase(getGuideTours.fulfilled, (state, action: any) => {
      state.data = action.payload.data;
      state.pagination = action.payload.meta;
      state.loading = false;
    });

    builder.addCase(getGuideTours.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default GuideTourProcess.reducer;
