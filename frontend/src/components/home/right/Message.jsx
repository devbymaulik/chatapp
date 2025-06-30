import React from "react";
import { useSelector } from "react-redux";
export default function Message({ message }) {
  const { data: user } = useSelector((state) => state.signinReducer);
  const currentUserId = user?.id;
  const isSender = message?.senderId?.toString() === currentUserId;
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="p-2">
      <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
        <div
          className={`chat-bubble ${
            isSender ? "chat-bubble-info" : "chat-bubble-accent"
          }`}
        >
          {message.message}
        </div>
        <div className="chat-footer text-xs text-gray-400">{formattedTime}</div>
      </div>
    </div>
  );
}
