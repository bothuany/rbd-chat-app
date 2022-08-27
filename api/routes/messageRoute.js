const express = require("express");
const router = express.Router();
const {
  sendMessage,
  fetchAllMessages,
} = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, fetchAllMessages);

module.exports = router;
