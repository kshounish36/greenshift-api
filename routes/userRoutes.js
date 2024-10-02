const express = require("express");
const router = express.Router();
const {
  login,
  getAllUsers,
  createNewUser,
  updateUserDetails,
  deleteUser,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");

router.post("/login", login);
router.put("/updateuser", authenticateToken, updateUserDetails);
router.get("/getallusers", authenticateToken, getAllUsers);
router.post("/createuser", authenticateToken, createNewUser);
router.delete("/deleteuser", authenticateToken, deleteUser);

module.exports = router;
