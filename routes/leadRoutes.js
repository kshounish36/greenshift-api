// routes/leadRoutes.js
const express = require("express");
const { check } = require("express-validator");
const {
  createLead,
  getAllLeads,
  updateLead,
} = require("../controllers/leadController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post(
  "/leads",
  [
    check("name")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Name is required"),
    check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    check("phone")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Phone number is required"),
    check("address")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Address is required"),
    check("electricityBillDetails")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Electricity Bill Details are required"),
    check("typeOfRoof")
      .isIn(["RCC", "Sheet Roof", "Without MMS"])
      .withMessage("Invalid type of roof"),
    check("subsidy").isIn(["Yes", "No"]).withMessage("Invalid subsidy value"),
    check("financing")
      .isIn(["Yes", "No"])
      .withMessage("Invalid financing value"),
    check("message")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Message is required"),
  ],
  createLead
);
router.get("/leads", authenticateToken, getAllLeads);
router.put("/leads", authenticateToken, updateLead);

module.exports = router;
