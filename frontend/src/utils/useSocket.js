import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage } from "../components/home/redux/actions.jsx";
import useConversation from "../statemanage/useConversation";

const useSocket = () => {
  const dispatch = useDispatch();
  const { data: user, isLogin } = useSelector((state) => state.signinReducer);
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { selectedConversation, setIsTyping } = useConversation();
  const notificationSound = useRef(null);

  useEffect(() => {
    // Load beep sound (must be in public folder /sounds/beep.mp3)
    notificationSound.current = new Audio("/sounds/beep.mp3");
  }, []);

  // Play beep only if message from other user and chat is not active
  const playBeepIfNeeded = (message, user, selectedConversation) => {
    const chatUserId =
      message.senderId === user.id ? message.receiverId : message.senderId;

    if (
      message.senderId !== user.id &&
      selectedConversation?._id !== chatUserId
    ) {
      notificationSound.current
        ?.play()
        .then(() => console.log("✅ Beep played"))
        .catch((err) => console.warn("🔇 Beep failed:", err));
    }
  };

  useEffect(() => {
    if (isLogin && user?.id && !socketRef.current) {
      socketRef.current = io("https://chatapp-vuht.onrender.com", {
        query: {
          userId: user.id,
          name: user.name,
          email: user.email,
        },
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        // console.log("✅ Socket connected:", socketRef.current.id);
      });

      socketRef.current.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socketRef.current.on("messageSent", (message) => {
        playBeepIfNeeded(message, user, selectedConversation);
        dispatch(receiveMessage(message));
      });

      socketRef.current.on("typing", ({ from }) => {
        if (selectedConversation?._id === from && setIsTyping) {
          setIsTyping(true);
        }
      });

      socketRef.current.on("stopTyping", ({ from }) => {
        if (selectedConversation?._id === from && setIsTyping) {
          setIsTyping(false);
        }
      });

      socketRef.current.on("disconnect", () => {
        // console.log("❌ Socket disconnected");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isLogin, user, dispatch, selectedConversation, setIsTyping]);

  const sendSocketMessage = (event, payload) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, payload);
    }
  };

  // Emit typing event to backend
  const emitTyping = (receiverId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("typing", { to: receiverId });
    }
  };

  // Emit stopTyping event to backend
  const emitStopTyping = (receiverId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("stopTyping", { to: receiverId });
    }
  };

  return {
    socket: socketRef.current,
    onlineUsers,
    sendSocketMessage,
    emitTyping,
    emitStopTyping,
  };
};

export default useSocket;
