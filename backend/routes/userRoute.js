const express = require("express");
const router = express.Router();

const { register, login, allUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").get(protect, allUsers);
router.route("/logout").get();

module.exports = router;
