import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js"; // Include `.js` if using ES Modules
import { authVerification } from "../middelwares/authVarification.js";

const messageRouter = express.Router();
// POST /api/message/send/:id — sends a message to the user with given ID
messageRouter.post("/sendmessage/:id", authVerification, sendMessage);
messageRouter.get("/getmessage/:id", authVerification, getMessage);
export default messageRouter;
