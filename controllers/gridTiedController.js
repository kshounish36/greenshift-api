const gridTiedSysService = require("../services/gridTiedService");

exports.searchSystems = async (req, res) => {
  try {
    const results = await gridTiedSysService.searchSystems(req.body);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBosItems = async (req, res) => {
  try {
    const { updatedItems, systemType, roof_typ, dc_capacity, no_of_phase } =
      req.body;

    const bosItemTotal = await gridTiedSysService.updateBosItems(updatedItems);

    // Recalculate the total price
    const systems = await gridTiedSysService.searchSystems({
      type: systemType,
      roof_typ,
      dc_capacity,
      no_of_phase,
    });
    const updatedSystems = systems.map((system) => {
      const updatedTotal =
        parseFloat(system.solar_mod_prc) +
        parseFloat(system.i_and_c_prc) +
        bosItemTotal;
      return {
        ...system,
        bos_prc: bosItemTotal,
        total: updatedTotal,
      };
    });

    res.status(200).json(updatedSystems);
  } catch (error) {
    console.error("Error updating BOS items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
