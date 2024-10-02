// controllers/solarModuleDetailsController.js
const { BosItems } = require("../models");

const createBOSItemDetails = async (req, res) => {
  try {
    const { item_nm, item_rate, item_uom } = req.body;

    const bosItem = await BosItems.create({
      item_nm,
      item_rate,
      item_uom,
    });

    res.status(201).json({
      message: "BOS Item created successfully!",
      bosItem,
    });
  } catch (error) {
    console.error("Error creating BOS Item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBOSItems = async (req, res) => {
  try {
    const gridBOSItemDetails = await BosItems.findAll();
    res.status(200).json(gridBOSItemDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch BOS items details" });
  }
};

const updateBOSItemDetails = async (req, res) => {
  const { item_id, item_nm, item_rate, item_uom } = req.body;

  try {
    const recordToUpdate = await BosItems.findByPk(item_id);

    if (!recordToUpdate) {
      return res.status(404).json({ error: "Record not found" });
    }

    await recordToUpdate.update({
      item_nm,
      item_rate,
      item_uom,
    });

    res
      .status(200)
      .json({ message: "Data updated successfully", data: recordToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteBOSItem = async (req, res) => {
  const { item_id } = req.body;
  try {
    const recordToDelete = await BosItems.findByPk(item_id);
    if (!recordToDelete) {
      return res.status(404).json({ error: "Record not found" });
    }

    if (recordToDelete) {
      await recordToDelete.destroy();
      res.status(200).json({
        message: "BOS Item deleted successfully",
        data: recordToDelete,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  createBOSItemDetails,
  getBOSItems,
  updateBOSItemDetails,
  deleteBOSItem,
};
