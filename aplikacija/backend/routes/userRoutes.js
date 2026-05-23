const express = require("express");
const router = express.Router();

const {
    getUserById,
    updateUser,
    changePassword
} = require("../controllers/userController");

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.put("/:id/password", changePassword);

module.exports = router;