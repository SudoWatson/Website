// Require Packages
const express = require("express");
const router = express.Router();
const getCurrentUser = require("../tools").getCurrentUser

// Require Models (If any)

// Routes
router.get("/", (req, res) => {
    res.render("programs/programs.ejs", {user: getCurrentUser(req)});
});

// Exports
module.exports = router;