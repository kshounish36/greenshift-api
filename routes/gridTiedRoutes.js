const express = require("express");
const router = express.Router();
const gridTiedSysController = require("../controllers/gridTiedController");

router.post("/search", gridTiedSysController.searchSystems);
router.post("/update", gridTiedSysController.updateBosItems);
router.post("/getsyscapacity", gridTiedSysController.getSysCapacity);

module.exports = router;
