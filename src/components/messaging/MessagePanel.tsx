"use client";
import React, { useEffect, useState } from "react";
import MessageList from "@/components/messaging/MessageList";
import MessageThreads from "@/components/messaging/MessageThreads";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { fetchThreads } from "@/services/redux/reducers/slices/MessagesSlice";

const MessagePanel = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: any) => state.auth.user?.id);
  const [currentId, setCurrentId] = useState<number>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const threads = useAppSelector((state: any) => state.messages.threads);

  useEffect(() => {
    if (userId) {
      dispatch(fetchThreads(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] md:h-[calc(100vh-150px)] bg-white text-black dark:bg-gray-800 dark:text-white rounded-xl shadow-lg">
      {threads.length === 0 && !showMenu && (
        <div className="flex-1 flex items-center justify-center">
          No messages
        </div>
      )}
      {/* Sidebar */}
      {threads.length > 0 && (
        <MessageThreads
          showCurrentThread={(id: number) => setCurrentId(id)}
          onShowMenu={(show: boolean) => {
            setShowMenu(show);
          }}
        />
      )}
      {/* Messaging Panel */}
      {!showMenu && currentId && <MessageList threadId={currentId} />}
    </div>
  );
};

export default MessagePanel;
