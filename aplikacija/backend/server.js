const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Maestro backend radi");
});

app.get("/api", (req, res) => {
    res.json({
        message: "Maestro API radi",
        endpoints: [
            "POST /api/auth/register",
            "POST /api/auth/login",
            "GET /api/users/:id",
            "PUT /api/users/:id",
            "PUT /api/users/:id/password",
            "GET /api/rewards?userId=:userId",
            "POST /api/rewards/claim",
            "GET /api/transactions/user/:userId",
            "GET /api/transactions/user/:userId/last",
            "GET /api/transactions/user/:userId/monthly",
            "GET /api/admin/users",
            "DELETE /api/admin/users/:id",
            "POST /api/admin/rewards",
            "DELETE /api/admin/rewards/:id",
            "POST /api/admin/transactions",
            "POST /api/admin/process-month",
            "GET /api/admin/stats"
        ]
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
});