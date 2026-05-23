const express = require("express");
const router = express.Router();

const {
    getTransactionsByUser,
    getLastTransactionByUser,
    getMonthlyCalculationsByUser
} = require("../controllers/transactionController");

router.get("/user/:userId", getTransactionsByUser);
router.get("/user/:userId/last", getLastTransactionByUser);
router.get("/user/:userId/monthly", getMonthlyCalculationsByUser);

module.exports = router;