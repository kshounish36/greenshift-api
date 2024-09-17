require("dotenv").config();
const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("greenshift", "root", "newpassword", {
  host: "localhost",
  dialect: "mysql",
});

// const sequelize = new Sequelize(
//   "tmsgrsz7_greenshift_web_app",
//   "tmsgrsz7_web_app_admin",
//   "FWe-Pd7ZgYM5",
//   {
//     host: "localhost",
//     dialect: "mysql",
//   }
// );

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false, // Disable the timestamps
  }
);

const predefinedUsers = [
  {
    user_name: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    user_name: "spandan",
    password: "danSpan",
    role: "admin",
  },
  {
    user_name: "user1",
    password: "user123",
    role: "user",
  },
  {
    user_name: "subdlr1",
    password: "subdlr123",
    role: "user",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true }); // This will create the table and drop it first if it already exists

    for (const user of predefinedUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        user_name: user.user_name,
        password: hashedPassword,
        role: user.role,
      });
    }

    console.log("Predefined users have been added");
    process.exit();
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
