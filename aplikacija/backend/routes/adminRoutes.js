const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    deleteUser,
    addReward,
    deleteReward,
    getStats,
    processMonthlyPoints,
    addTransaction
} = require("../controllers/adminController");

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.post("/rewards", addReward);
router.delete("/rewards/:id", deleteReward);

router.get("/stats", getStats);

router.post("/process-month", processMonthlyPoints);

router.post("/transactions", addTransaction);

module.exports = router;