import React from "react";
import useConversation from "../../../statemanage/useConversation.js";
import useSocket from "../../../utils/useSocket.js";
export default function User({ user }) {
  const { socket, onlineUsers } = useSocket();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const uploadUrl = import.meta.env.VITE_BACKEND_URL;
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.some((u) => u.id === user._id);

  if (!user) return null;

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`
        cursor-pointer
        px-5 py-4
        flex items-center space-x-4
        rounded-lg
        transition
        duration-300
        ${
          isSelected
            ? "bg-blue-600 text-white shadow-lg"
            : "hover:bg-gray-200 hover:text-gray-900"
        }
      `}
      title={`Chat with ${user.name}`}
    >
      <div className="relative">
        <img
          src={
            user?.avatar
              ? `${uploadUrl}/public${user.avatar}`
              : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt={user?.name}
          className={`w-14 h-14 rounded-full object-cover ${
            isOnline ? "ring-2 ring-green-400" : "ring-1 ring-gray-300"
          }`}
        />

        {isOnline && (
          <span
            className="
              absolute bottom-0 right-0
              block w-4 h-4
              bg-green-500
              border-2 border-white
              rounded-full
              animate-pulse
            "
            aria-label="Online"
            title="Online"
          ></span>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-lg truncate max-w-xs">
          {user?.name}
        </h1>
        <span className="text-sm truncate max-w-xs">{user?.email}</span>
      </div>
    </div>
  );
}
