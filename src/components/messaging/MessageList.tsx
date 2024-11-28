"use client";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  fetchMessages,
  sendMessage,
} from "@/services/redux/reducers/slices/MessagesSlice";
import Pusher from "pusher-js";
import moment from "moment";
import ButtonCircle from "../shared/ButtonCircle";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "../shared/ButtonPrimary";

const MessageList = ({ threadId }: { threadId: number }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const messages = useAppSelector(
    (state) => state.messages.messages[threadId] || []
  );

  useEffect(() => {
    // Fetch messages for the current thread
    dispatch(fetchMessages(threadId));

    // Subscribe to Pusher for real-time updates
    const pusher = new Pusher("eedb67f0945cdc6cdb17", { cluster: "ap2" });
    const channel = pusher.subscribe(`thread-${threadId}`);
    channel.bind("message", (data: any) => {
      if (data.thread_id === threadId) {
        dispatch(fetchMessages(threadId));
      }
    });

    return () => {
      pusher.unsubscribe(`thread-${threadId}`);
    };
  }, [dispatch, threadId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);


  const formatTime = (messageTime: string) => {

    const time = moment(messageTime);

    if (!time.isValid()) {
      return messageTime;
    }

    if (time.isSame(moment(), "day")) {
      return time.fromNow();
    }

    return time.calendar(null, {
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "LL [at] LT",
    });
  }


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    dispatch(
      sendMessage({ threadId, senderId: user?.id, content: newMessage })
    );
    setNewMessage("");
  };

  if (!user) {
    return;
  }

  return (
    <div className="w-full md:w-3/4 p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-4 dark:text-white">Conversations</h2>
      <div
        ref={messagesEndRef}
        className="flex-1 h-[45vh] max-h-[45vh] md:h-[calc(100vh-130px)] md:max-h-[calc(65vh)] scrollbar
            border border-gray-300 rounded-lg p-4 overflow-y-auto mb-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-600"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message mb-4 flex ${
              Number(message.user_id) == user.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`inline-block max-w-xs p-3 rounded-xl ${
                Number(message.user_id) == user.id
                  ? "bg-blue-500 text-white dark:bg-blue-600 rounded-br-none"
                  : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-bl-none"
              }`}
            >
              <div>
                <p className="text-sm">{message.message}</p>
                <p
                  className={
                    "text-xs text-muted mt-1 dark:text-gray-400 " +
                    (Number(message.user_id) == user.id
                      ? "text-right text-gray-300"
                      : "text-gray-400")
                  }
                >
                  {formatTime(message.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <form onSubmit={handleSendMessage} className="w-full flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-full mr-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <ButtonPrimary
            onClick={() => handleSendMessage}
            className="py-2 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Send
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default MessageList;
