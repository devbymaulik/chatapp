import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../redux/dispatcher";
import useConversation from "../../../statemanage/useConversation";
import { LoadingPageChatMessage } from "../../LoadingPage";
import ErrorPage from "../../ErrorPage";

export default function Messages() {
  const dispatch = useDispatch();
  const {
    data: messages,
    loading,
    error,
  } = useSelector((state) => state.getMessageReducer);
  const { selectedConversation } = useConversation();
  const lastMsgRef = useRef(null);

  useEffect(() => {
    if (selectedConversation && selectedConversation._id) {
      dispatch(getMessage(selectedConversation._id));
    }
  }, [selectedConversation, dispatch]);

  // Auto-scroll to last message
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  if (loading) return <LoadingPageChatMessage />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="h-full px-2 py-4 overflow-y-auto">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMsgRef : null}
          >
            <Message message={msg} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 my-8 space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-600"
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
          <p className="text-lg font-semibold text-white">No messages yet</p>
          <p className="text-sm text-white">
            Start a conversation to see messages here.
          </p>
        </div>
      )}
    </div>
  );
}
