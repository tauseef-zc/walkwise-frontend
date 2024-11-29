import { useEffect, useState } from "react";
import { useAppSelector } from "@/services/redux/hooks";
import { Thread } from "@/services/redux/reducers/slices/MessagesSlice";

const MessageThreads = ({
  showCurrentThread,
  onShowMenu,
}: {
  showCurrentThread: (id: number) => void;
  onShowMenu: (show: boolean) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const threads = useAppSelector((state: any) => state.messages.threads);
  
  useEffect(() => {
    onShowMenu(showMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenu]);

  return (
    <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-6 pt-8">
      <div className="flex justify-between items-center md:hidden mb-4">
        <h2 className="text-lg font-bold dark:text-white">Threads</h2>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showMenu ? "Close" : "Menu"}
        </button>
      </div>
      {(showMenu || !showMenu) && (
        <ul className={`${showMenu ? "" : "hidden"} md:block`}>
          {threads &&
            threads.length > 0 &&
            threads.map((thread: Thread, index: number) => (
              <li
                key={index}
                onClick={() => showCurrentThread(thread.id)}
                className="py-3 px-4 mb-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition-colors"
              >
                {thread.thread_name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MessageThreads;