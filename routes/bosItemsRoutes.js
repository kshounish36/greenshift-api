// routes/leadRoutes.js
const express = require("express");
const {
  getBOSItems,
  createBOSItemDetails,
  updateBOSItemDetails,
  deleteBOSItem,
} = require("../controllers/bosItemsController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/createbositem", authenticateToken, createBOSItemDetails);
router.put("/updatebositem", authenticateToken, updateBOSItemDetails);
router.get("/bositems", authenticateToken, getBOSItems);
router.delete("/deletebositem", authenticateToken, deleteBOSItem);

module.exports = router;
