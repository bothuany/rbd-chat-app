const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");

const sendMessage = asyncHandler(async (req, res) => {
  let { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400);
    throw new Error("Content and chatId are required");
  }

  let message = { sender: req.user._id, content, chat: chatId };

  try {
    let newMessage = await Message.create(message);

    newMessage = await newMessage.populate("sender", "username");
    newMessage = await newMessage.populate("chat");
    newMessage = await User.populate(newMessage, {
      path: "chat.users",
      select: "username email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    throw new Error(error.message);
  }
});

const fetchAllMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "username email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, fetchAllMessages };
