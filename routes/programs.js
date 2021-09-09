// Require Packages
import {Router} from "express"

import * as tools from "../tools.js"

const router = Router();
const getCurrentUser = tools.getCurrentUser

// Require Models (If any)

// Routes
router.get("/", (req, res) => { 
    res.render("programs/programs.ejs", {user: getCurrentUser(req)});
});

// Exports
export default router;
