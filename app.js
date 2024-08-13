const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const gridTiedRoutes = require("./routes/gridTiedRoutes");
const sequelize = require("./models").sequelize;
const userRoutes = require("./routes/userRoutes");
const leadRoutes = require("./routes/leadRoutes");
const authenticateToken = require("./middleware/auth");

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://greenshift.energy", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/api/grid-tied", authenticateToken, gridTiedRoutes);
app.use("/api/users", userRoutes);
app.use("/api", leadRoutes);

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
