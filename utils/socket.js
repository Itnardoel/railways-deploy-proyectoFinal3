import { Server } from "socket.io";
import axios from "axios";

import logger from "./logger.js";

let io;

let messages = [];

function initSocket(httpServer) {
  try {
    io = new Server(httpServer);
    setEvents(io);
  } catch (error) {
    logger.error(error.message);
  }
}

function setEvents(io) {
  io.on("connection", (socketClient) => {
    logger.info("New client connected with id", socketClient.id);

    getAllMessages();

    socketClient.emit("history-messages", messages);

    socketClient.on("new-message", (data) => {
      messages.push(data);
      saveNewMessage(data);
      io.emit("notification", data);
    });

    socketClient.on("disconnect", (socketClient) => {
      logger.info("Client disconnected.");
    });
  });
}

async function getAllMessages() {
  try {
    const token = await axios.get("http://localhost:8080/token");
    const response = await axios.get("http://localhost:8080/chat", {
      headers: { Authorization: `Bearer ${token.data}` },
    });
    const historyMessages = await response.json();

    if (historyMessages.length == 0) {
      return;
    }
    messages = historyMessages;
  } catch (error) {
    logger.error(error.message);
  }
}

async function saveNewMessage(data) {
  try {
    const token = await axios.get("http://localhost:8080/token");
    await axios.post("http://localhost:8080/chat", data, {
      headers: { Authorization: `Bearer ${token.data}` },
    });
  } catch (error) {
    logger.error(error.message);
  }
}

export { initSocket };
