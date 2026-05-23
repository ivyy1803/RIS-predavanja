const express = require("express");
const router = express.Router();

const {
    getAllRewards,
    claimReward
} = require("../controllers/rewardController");

router.get("/", getAllRewards);
router.post("/claim", claimReward);

module.exports = router;