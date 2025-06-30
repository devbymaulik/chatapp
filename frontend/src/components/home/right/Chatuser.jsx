import React from "react";
import useConversation from "../../../statemanage/useConversation";
import useSocket from "../../../utils/useSocket";

export default function Chatuser() {
  const uploadUrl = import.meta.env.VITE_BACKEND_URL;
  const { onlineUsers } = useSocket();
  const { selectedConversation, isTyping } = useConversation();

  const isOnline = selectedConversation
    ? onlineUsers.some((u) => u.id === selectedConversation._id)
    : false;

  return (
    <div
      className="
        pl-5 pr-6 py-4
        flex items-center space-x-4
        bg-gray-900 hover:bg-gray-700
        transition-colors duration-300
        min-h-[60px]
        select-none
        rounded-b-md
      "
    >
      <div
        className={`w-14 h-14 rounded-full overflow-hidden ${
          isOnline ? "ring-2 ring-green-400" : "ring-1 ring-gray-700"
        }`}
      >
        <img
          src={
            selectedConversation?.avatar
              ? `${uploadUrl}/public${selectedConversation.avatar}`
              : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt={selectedConversation?.name || "User avatar"}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h1 className="text-xl font-semibold text-white truncate">
          {selectedConversation?.name || "Select a user"}
        </h1>
        <span
          className={`text-sm ${isOnline ? "text-green-400" : "text-gray-500"}`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
        <div className="text-sm mt-1 h-5 min-h-[1.25rem]">
          {isTyping && (
            <span className="text-blue-400 italic animate-pulse">
              {selectedConversation?.name} is typing...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
