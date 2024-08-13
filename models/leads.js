module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define(
    "Lead",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      electricityBillDetails: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      typeOfRoof: {
        type: DataTypes.ENUM("RCC", "Sheet Roof", "Without MMS"),
        allowNull: false,
      },
      subsidy: {
        type: DataTypes.ENUM("Yes", "No"),
        allowNull: false,
      },
      financing: {
        type: DataTypes.ENUM("Yes", "No"),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "leads",
      timestamps: true,
    }
  );

  return Lead;
};
