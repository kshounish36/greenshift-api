const db = require("../models");
const GridTiedSys = db.GridTiedSys;
const OffGridSys = db.OffGridSys;
const HybridSys = db.HybridSys;
const BosItems = db.BosItems;

// Function to calculate total BOS price
const calculateBosItemTotal = async (bos_itm_qty) => {
  let bosItemTotal = 0;

  for (const item of bos_itm_qty) {
    for (const item_id in item) {
      const quantity = item[item_id];
      const bosItem = await BosItems.findOne({ where: { item_id } });
      if (bosItem) {
        bosItemTotal += bosItem.item_rate * quantity;
      }
    }
  }

  return bosItemTotal;
};

// Function to fetch BOS item details along with quantities
const fetchBosItemDetails = async (bos_itm_qty) => {
  const bosItems = await Promise.all(
    bos_itm_qty.map(async (item) => {
      const item_id = Object.keys(item)[0];
      const quantity = item[item_id];
      const bosItem = await BosItems.findOne({ where: { item_id } });
      return bosItem
        ? {
            item_id: bosItem.item_id,
            item_nm: bosItem.item_nm,
            item_rate: bosItem.item_rate,
            item_uom: bosItem.item_uom,
            quantity,
          }
        : null;
    })
  );

  return bosItems.filter(Boolean); // Remove null values
};

// Function to search systems based on provided criteria
const searchSystems = async ({ type, roof_typ, dc_capacity, no_of_phase }) => {
  let Model;

  switch (type) {
    case "grid-tied":
      Model = GridTiedSys;
      break;
    case "off-grid":
      Model = OffGridSys;
      break;
    case "hybrid":
      Model = HybridSys;
      break;
    default:
      throw new Error("Invalid system type");
  }

  const results = await Model.findAll({
    where: {
      roof_typ,
      dc_capacity,
      no_of_phase,
    },
  });

  const response = await Promise.all(
    results.map(async (result) => {
      const bos_itm_qty = result.bos_itm_qty;

      const bosItems = await fetchBosItemDetails(bos_itm_qty);

      const bosItemTotal = await calculateBosItemTotal(bos_itm_qty);
      const solar_mod_prc = parseFloat(result.solar_mod_prc);
      const i_and_c_prc = parseFloat(result.i_and_c_prc);
      const total = solar_mod_prc + i_and_c_prc + bosItemTotal;

      return {
        ...result.dataValues,
        bosItems,
        bos_prc: bosItemTotal,
        total,
      };
    })
  );

  return response;
};

// Function to update BOS item details
const updateBosItems = async (updatedItems) => {
  let bosItemTotal = 0;

  for (const item of updatedItems) {
    const bosItem = await BosItems.findOne({
      where: { item_id: item.item_id },
    });
    if (bosItem) {
      bosItem.item_rate = item.item_rate;
      await bosItem.save();
      bosItemTotal += bosItem.item_rate * item.quantity;
    }
  }

  return bosItemTotal;
};

module.exports = {
  searchSystems,
  updateBosItems,
};
