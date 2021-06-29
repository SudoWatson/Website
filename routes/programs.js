// Require Packages
const express = require("express");
const router = express.Router();

// Require Models (If any)

// Initialize to getCurrentUser
let getCurrentUser;
init = getCurrentUserFunc => getCurrentUser = getCurrentUserFunc;

// Routes
router.get("/", (req, res) => {
    res.render("programs/programs.ejs", {user: getCurrentUser(req)});
});

// Exports
module.exports = {init, router};