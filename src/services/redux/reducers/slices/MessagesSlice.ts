"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/clientApi";
import { AxiosResponse } from "axios";

export interface Thread {
  id: number;
  thread_name: string;
  participants: string[];
}

export interface Message {
  id: number;
  user_id: string;
  message: string;
  thread_id: number
  created_at: string;
}

export interface ChatState {
  threads: Thread[];
  messages: { [threadId: string]: Message[] };
  loading: boolean;
  error: string | null | undefined;
}

const initialState: ChatState = {
  threads: [],
  messages: {},
  loading: false,
  error: null,
};

// Fetch user threads
export const fetchThreads = createAsyncThunk(
  "chat/fetchThreads",
  async (userId: string | number) =>
    (await axiosInstance.get("/messages/threads/" + userId)) as AxiosResponse
);

// Fetch messages for a thread
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (threadId: string | number) => {
    return await axiosInstance.get(`/messages/list/${threadId}`);
  }
);

// Send a new message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({
    threadId,
    senderId,
    content,
  }: {
    threadId: number | string;
    senderId: number | string | undefined;
    content: number | string;
  }) => {
    return await axiosInstance.post("/messages/send", {
      thread_id: threadId,
      user_id: senderId,
      message: content,
    });
  }
);

const MessageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle threads
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThreads.fulfilled, (state, action: any) => {
        state.loading = false;
        state.threads = action.payload?.threads;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action: any) => {
        state.loading = false;
        state.messages[action.meta.arg] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle sending messages
      .addCase(sendMessage.fulfilled, (state, action: any) => {
        console.log({ res: action.payload });
        const message = action.payload?.message;
        if (!state.messages[message.thread_id]) {
          state.messages[message.thread_id] = [];
        }
        state.messages[message.thread_id].push(message);
      });
  },
});

export default MessageSlice.reducer;
