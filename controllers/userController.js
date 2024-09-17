const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const login = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const user = await User.findOne({ where: { user_name } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, user_name: user.user_name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.user_name,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const gridUsersDetails = await User.findAll();
    const userDetails = gridUsersDetails.map(({ id, user_name, role }) => ({
      id,
      user_name,
      role,
    }));
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

const createNewUser = async (req, res) => {
  const { user_name, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const createdRecord = await User.create({
      user_name,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      data: createdRecord,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserDetails = async (req, res) => {
  const { id, user_name, role } = req.body;

  try {
    const recordToUpdate = await User.findByPk(id);

    if (!recordToUpdate) {
      return res.status(404).json({ error: "Record not found" });
    }

    await recordToUpdate.update({
      user_name,
      role,
    });

    res
      .status(200)
      .json({ message: "Data updated successfully", data: recordToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { login, getAllUsers, createNewUser, updateUserDetails };
