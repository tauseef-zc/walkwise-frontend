"use client";
import api, { get } from "@/lib/restApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tour } from "@/data/tours";

export interface ITour extends Tour {
  status?: string;
  info?: string;
}

export interface LikedTourState {
  loading: boolean;
  data: ITour[];
  pagination?: any;
  empty: boolean;
}

const initialState: LikedTourState = {
  loading: false,
  data: [],
  pagination: {},
  empty: false,
};

export const getLikedTours = createAsyncThunk(
  "gettingLikedTours",
  async (page: number) => await get("/wishlist?page=" + page)
);

const LikedTourProcess = createSlice({
  name: "gettingLikedTours",
  initialState,
  reducers: {
    clearLikedTours: (state: LikedTourState) => {
      state = initialState;
    },

    dislikeTour: (state: LikedTourState, action) => {
      state.data = state.data.filter((tour) => tour.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLikedTours.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.pagination = {};
    });

    builder.addCase(getLikedTours.fulfilled, (state, action: any) => {
      state.data = action.payload.data;
      state.pagination = action.payload.meta;
      state.loading = false;
      state.empty = state.data.length === 0;
    });

    builder.addCase(getLikedTours.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { clearLikedTours, dislikeTour } = LikedTourProcess.actions;

export default LikedTourProcess.reducer;
