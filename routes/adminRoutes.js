const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const isAdminUser = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/",authMiddleware,isAdminUser, (req, res) => {
    res.json({
        success: true,
        message: "Admin page",
    });
});

module.exports = router;