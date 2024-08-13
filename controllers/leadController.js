// controllers/leadController.js
const { Lead } = require("../models");
const { validationResult } = require("express-validator");

const createLead = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      email,
      phone,
      address,
      electricityBillDetails,
      typeOfRoof,
      subsidy,
      financing,
      message,
    } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      address,
      electricityBillDetails,
      typeOfRoof,
      subsidy,
      financing,
      message,
    });

    res.status(201).json({
      message:
        "Your request submitted successfully! Our team will contact you soon. Thank you for showing interest in Greenshift. Stay sustainable! :)",
      lead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

const updateLead = async (req, res) => {
  const { id, notes, updatedBy } = req.body;

  try {
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    lead.notes = notes;
    lead.updatedBy = updatedBy;
    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  updateLead,
};
