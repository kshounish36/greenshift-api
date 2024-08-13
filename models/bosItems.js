module.exports = (sequelize, DataTypes) => {
  const BosItems = sequelize.define(
    "BosItems",
    {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      item_nm: {
        type: DataTypes.STRING,
      },
      item_rate: {
        type: DataTypes.DECIMAL(10, 2),
      },
      item_uom: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "bos_items",
      timestamps: false,
    }
  );

  return BosItems;
};
