const express = require("express");
const router = express.Router();
const {
  searchSystems,
  updateBosItems,
  getSysCapacity,
} = require("../controllers/gridTiedController");
const authenticateToken = require("../middleware/auth");

router.post("/search", authenticateToken, searchSystems);
router.post("/update", authenticateToken, updateBosItems);
router.post("/getsyscapacity", authenticateToken, getSysCapacity);

module.exports = router;
