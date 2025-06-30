import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../../statemanage/useConversation";

export default function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null); // Reset on unmount
  }, [setSelectedConversation]);

  if (!selectedConversation) {
    return (
      <div className="w-full h-full bg-slate-950 text-white flex flex-col items-center justify-center px-6 py-8 sm:px-4">
        <div className="flex flex-col items-center justify-center space-y-5 text-center max-w-md w-full">
          {/* Icon with circular background */}
          <div className="bg-slate-800 p-4 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h6m-6 4h10m-6 8a9 9 0 100-18 9 9 0 000 18z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            No Conversation Selected
          </h2>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-gray-400 max-w-xs">
            Choose a contact from the left drawer to start chatting.
          </p>

          {/* Drawer Toggle (Mobile Only) */}
          <button
            className="btn btn-primary mt-2 sm:hidden"
            onClick={() => document.getElementById("my-drawer").click()}
          >
            Open Chat List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-slate-800">
        <Chatuser />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto vertical_scrollbar">
        <Messages />
      </div>

      {/* Input */}
      <div className="border-t border-slate-800">
        <Type />
      </div>
    </div>
  );
}
