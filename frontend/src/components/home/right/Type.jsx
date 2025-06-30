import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/dispatcher";
import useConversation from "../../../statemanage/useConversation";
import useSocket from "../../../utils/useSocket.js";

function Type() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedConversation } = useConversation();
  const { emitTyping, emitStopTyping } = useSocket();

  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const emitTypingSafe = () => {
    if (!isTypingRef.current && selectedConversation?._id) {
      emitTyping(selectedConversation._id);
      isTypingRef.current = true;
    }

    // Reset the timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current && selectedConversation?._id) {
        emitStopTyping(selectedConversation._id);
        isTypingRef.current = false;
      }
    }, 2000); // Keep user "typing" for 3 seconds after last keypress
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (selectedConversation?._id) {
      emitTypingSafe();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || !selectedConversation?._id) return;

    dispatch(sendMessage(selectedConversation._id, { message: trimmed }));
    setMessage("");
    if (isTypingRef.current) {
      emitStopTyping(selectedConversation._id);
      isTypingRef.current = false;
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  useEffect(() => {
    return () => {
      if (isTypingRef.current && selectedConversation?._id) {
        emitStopTyping(selectedConversation._id);
        isTypingRef.current = false;
      }
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [selectedConversation]);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[10vh] bg-slate-950 px-4 py-2 flex items-center gap-4 border-t border-slate-800"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        className="flex-1 input input-bordered bg-slate-900 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className={`p-2 rounded-full ${
          message.trim()
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        } transition`}
      >
        <IoSend className="text-2xl" />
      </button>
    </form>
  );
}
export default Type;
