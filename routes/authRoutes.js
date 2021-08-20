const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const getCurrentUser = require("../tools.js").getCurrentUser
const User = require("../models/user.js");

router.use(express.urlencoded({extended: false})); // Allows us to access the form data via req.body.formField

router.get("/signin", (req, res) => {
	res.render("authent/login.ejs", {user: getCurrentUser(req)});
});

router.get("/signUp", (req, res) => {
	res.render("authent/signUp.ejs", {user: getCurrentUser(req)});
});

router.post("/signUp", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			username: req.body.userName,
			email: req.body.email,
			password: hashedPassword,
			roles: ["read"],
		});

		try {
			const newUser = await user.save();
			res.redirect("/signin");
		} catch (err2) {
            console.error("Error in ", __filename);
			console.error(err2);
			res.render("/signUp");
		}
	} catch (err1) {
		console.error("Error in ", __filename);
		console.error(err1);
		res.redirect("/signup");
	}
});

router.delete("/logOut", (req, res) => {
	req.logOut()
	res.redirect("/")
})

module.exports = router;