"use client";
import React, { useState } from "react";
import MessageList from "@/components/messaging/MessageList";
import MessageThreads from "@/components/messaging/MessageThreads";

const MessagePanel = () => {
  const [currentId, setCurrentId] = useState<number>();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] md:h-[calc(100vh-150px)] bg-white text-black dark:bg-gray-800 dark:text-white rounded-xl shadow-lg">
      {/* Sidebar */}
      <MessageThreads
        showCurrentThread={(id: number) => setCurrentId(id)}
        onShowMenu={(show: boolean) => {
          setShowMenu(show);
        }}
      />
      {/* Messaging Panel */}
      {!showMenu && currentId && <MessageList threadId={currentId} />}
    </div>
  );
};

export default MessagePanel;
