module.exports = (sequelize, DataTypes) => {
  const GridTiedSys = sequelize.define(
    "GridTiedSys",
    {
      no_of_modules: {
        type: DataTypes.INTEGER,
      },
      dc_capacity: {
        type: DataTypes.DECIMAL(10, 2),
        primaryKey: true,
      },
      inv_capacity: {
        type: DataTypes.INTEGER,
      },
      no_of_phase: {
        type: DataTypes.INTEGER,
      },
      roof_typ: {
        type: DataTypes.ENUM("rcc", "sheet roof", "w/o mms"),
      },
      solar_mod_prc: {
        type: DataTypes.DECIMAL(10, 2),
      },
      subdlr_solar_mod_prc: {
        type: DataTypes.DECIMAL(10, 2),
      },
      i_and_c_prc: {
        type: DataTypes.DECIMAL(10, 2),
      },
      bos_prc: {
        type: DataTypes.DECIMAL(10, 2),
      },
      bos_itm_qty: {
        type: DataTypes.JSON,
      },
    },
    {
      tableName: "grid_tied_sys",
      timestamps: false,
    }
  );

  return GridTiedSys;
};
