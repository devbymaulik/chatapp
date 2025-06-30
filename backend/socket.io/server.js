import { Server } from "socket.io";
let io;

const onlineUsers = new Map(); // userId => { socketId, user }

export const initSocket = (server) => {
  if (io) return io; // avoid re-initializing on hot reloads

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // frontend origin
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    const name = socket.handshake.query.name;
    const email = socket.handshake.query.email;

    if (userId && name && email) {
      const userData = { id: userId, name, email };
      onlineUsers.set(userId, { socketId: socket.id, user: userData });
      emitOnlineUsers(); // broadcast updated user list
    }

    // Broadcast new message to others
    socket.on("messageSent", (msg) => {
      socket.broadcast.emit("messageSent", msg);
    });

    socket.on("disconnect", () => {
      for (const [uid, { socketId }] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(uid);
          break;
        }
      }
      emitOnlineUsers(); // broadcast updated user list
    });

    // Listen for messageSent on this socket (client)
    socket.on("messageSent", (msg) => {
      console.log("Received message:", msg);
      // Broadcast to all clients except sender
      socket.broadcast.emit("messageSent", msg);
    });

    // New: Handle typing event, send to specific user
    socket.on("typing", ({ to }) => {
      const receiver = onlineUsers.get(to);
      if (receiver) {
        io.to(receiver.socketId).emit("typing", { from: userId });
      }
    });
    // New: Handle stopTyping event
    socket.on("stopTyping", ({ to }) => {
      const receiver = onlineUsers.get(to);
      if (receiver) {
        io.to(receiver.socketId).emit("stopTyping", { from: userId });
      }
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const getOnlineUserMap = () => onlineUsers;

export const getOnlineUsers = () =>
  Array.from(onlineUsers.values()).map((entry) => entry.user);

const emitOnlineUsers = () => {
  io.emit("onlineUsers", getOnlineUsers());
};
