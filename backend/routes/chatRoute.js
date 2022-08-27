const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroup);
router.route("/group/rename").put(protect, renameGroup);
router.route("/group/addmember").post(protect, addToGroup);
router.route("/group/removemember").post(protect, removeFromGroup);

module.exports = router;
