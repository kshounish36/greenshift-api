require("dotenv").config();
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");
const db = require("../models");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const User = db.User;

const predefinedUsers = [
  {
    user_name: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    user_name: "user1",
    password: "user123",
    role: "emp",
  },
  {
    user_name: "subdlr1",
    password: "subdlr123",
    role: "subdlr",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

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
