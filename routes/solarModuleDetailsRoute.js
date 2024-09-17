const express = require("express");
const {
  createItem,
  getGridTiedSys,
  getOffGridSys,
  getHybridSys,
  updateSolarItem,
} = require("../controllers/solarModuleDetailsController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/createitem", authenticateToken, createItem);
router.put("/updateitem", authenticateToken, updateSolarItem);
router.get("/gridtied", authenticateToken, getGridTiedSys);
router.get("/offgrid", authenticateToken, getOffGridSys);
router.get("/hybrid", authenticateToken, getHybridSys);

module.exports = router;
