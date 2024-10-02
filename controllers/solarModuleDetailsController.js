// controllers/solarModuleDetailsController.js
const { GridTiedSys, HybridSys, OffGridSys } = require("../models");

const createItem = async (req, res) => {
  const {
    sysType,
    bos_itm_qty,
    noOfModules,
    dcCapacity,
    invCapacity,
    noOfPhase,
    roofTyp,
    solarModPrc,
    subdlrSolarModPrc,
    iAndCPrc,
    bosPrc,
  } = req.body;

  let model;
  if (sysType === "grid-tied") {
    model = GridTiedSys;
  } else if (sysType === "off-grid") {
    model = OffGridSys;
  } else if (sysType === "hybrid") {
    model = HybridSys;
  }

  try {
    const createdRecord = await model.create({
      no_of_modules: noOfModules,
      dc_capacity: dcCapacity,
      inv_capacity: invCapacity,
      no_of_phase: noOfPhase,
      roof_typ: roofTyp,
      solar_mod_prc: solarModPrc,
      subdlr_solar_mod_prc: subdlrSolarModPrc,
      i_and_c_prc: iAndCPrc,
      bos_prc: bosPrc,
      bos_itm_qty: bos_itm_qty, // Save BOS items and quantity as JSON
    });

    res.status(201).json({
      message: "Solar Item created successfully",
      data: createdRecord,
    });
  } catch (error) {
    console.error("Error creating solar item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getGridTiedSys = async (req, res) => {
  try {
    const gridTiedSysDetails = await GridTiedSys.findAll();
    res.status(200).json(gridTiedSysDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grid tied system details" });
  }
};

const getOffGridSys = async (req, res) => {
  try {
    const offGridSysDetails = await OffGridSys.findAll();
    res.status(200).json(offGridSysDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offgrid system details" });
  }
};

const getHybridSys = async (req, res) => {
  try {
    const hybridSysDetails = await HybridSys.findAll();
    res.status(200).json(hybridSysDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hybrid system details" });
  }
};

const updateSolarItem = async (req, res) => {
  const {
    sysType,
    bos_itm_qty,
    noOfModules,
    dcCapacity,
    invCapacity,
    noOfPhase,
    roofTyp,
    solarModPrc,
    subdlrSolarModPrc,
    iAndCPrc,
    bosPrc,
  } = req.body;

  let model;
  if (sysType === "grid-tied") {
    model = GridTiedSys;
  } else if (sysType === "off-grid") {
    model = OffGridSys;
  } else if (sysType === "hybrid") {
    model = HybridSys;
  }

  try {
    const recordToUpdate = await model.findByPk(dcCapacity);

    if (!recordToUpdate) {
      return res.status(404).json({ error: "Record not found" });
    }

    await recordToUpdate.update({
      no_of_modules: noOfModules,
      dc_capacity: dcCapacity,
      inv_capacity: invCapacity,
      no_of_phase: noOfPhase,
      roof_typ: roofTyp,
      solar_mod_prc: solarModPrc,
      subdlr_solar_mod_prc: subdlrSolarModPrc,
      i_and_c_prc: iAndCPrc,
      bos_prc: bosPrc,
      bos_itm_qty: bos_itm_qty,
    });

    res
      .status(200)
      .json({ message: "Data updated successfully", data: recordToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteSolarItem = async (req, res) => {
  const { dcCapacity, sysType } = req.body;

  let model;
  if (sysType === "grid-tied") {
    model = GridTiedSys;
  } else if (sysType === "off-grid") {
    model = OffGridSys;
  } else if (sysType === "hybrid") {
    model = HybridSys;
  }

  try {
    const recordToDelete = await model.findByPk(dcCapacity);

    if (!recordToDelete) {
      return res.status(404).json({ error: "Record not found" });
    }

    if (recordToDelete) {
      await recordToDelete.destroy();
      res.status(200).json({
        message: "Solar Item deleted successfully",
        data: recordToDelete,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  createItem,
  getGridTiedSys,
  getOffGridSys,
  getHybridSys,
  updateSolarItem,
  deleteSolarItem,
};
