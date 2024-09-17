const express = require("express");
const router = express.Router();
const {
  login,
  getAllUsers,
  createNewUser,
  updateUserDetails,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");

router.post("/login", login);
router.put("/updateuser", authenticateToken, updateUserDetails);
router.get("/getallusers", authenticateToken, getAllUsers);
router.post("/createuser", authenticateToken, createNewUser);

module.exports = router;
