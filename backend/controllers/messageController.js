// ✅ controllers/messageController.js
import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getIO, getOnlineUserMap } from "../socket.io/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.userID;

    if (!message || !receiverId) {
      return res
        .status(400)
        .json({ error: "Message and receiver Id are required." });
    }

    let conversation = await conversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        members: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
      conversationId: conversation._id,
    });

    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    const io = getIO();
    const onlineUsers = getOnlineUserMap();

    const senderSocket = onlineUsers.get(senderId.toString());
    const receiverSocket = onlineUsers.get(receiverId.toString());

    if (senderSocket) {
      io.to(senderSocket.socketId).emit("messageSent", newMessage);
    }
    if (receiverSocket) {
      io.to(receiverSocket.socketId).emit("messageSent", newMessage);
    }

    return res.status(201).json({
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error. Something went wrong on our side.",
      error: error.message,
    });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user.userID;

    const conversation = await conversationModel
      .findOne({ members: { $all: [senderId, chatUser] } })
      .populate({ path: "messages", options: { sort: { createdAt: 1 } } });

    if (!conversation) {
      return res.status(200).json({ message: "No messages found.", data: [] });
    }

    return res.status(200).json({
      message: "Messages fetched successfully.",
      data: conversation.messages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error. Something went wrong on our side.",
      error: error.message,
    });
  }
};
