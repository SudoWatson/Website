const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const tools = require("../tools")

const getCurrentUser = tools.getCurrentUser
const checkAuth = tools.checkAuth

const User = require("../models/user.js");

router.use(express.urlencoded({extended: false})); // Allows us to access the form data via req.body.formField


router.get("/account", checkAuth, (req, res) => {
	res.render("account/account.ejs", {user: getCurrentUser(req)});
});

// TODO Confirm account deletion
router.delete("/account", checkAuth, async (req, res) => {
	try {
		user = await tools.getUser(req.user.email)
		await user.remove()
		req.logout()
		res.redirect("/")
	} catch(e) {
		if (user == null) {  // No user found to delete
			res.redirect("/")
		} else {
			console.error(e)
			res.render("account/account.ejs", {
				user: getCurrentUser(req),
				errorMessage: "Error deleting account"
			})
		}
	}
})

router.get("/signIn", (req, res) => {
	res.render("account/login.ejs", {user: getCurrentUser(req)});
});

router.get("/signUp", (req, res) => {
	res.render("account/signUp.ejs", {user: getCurrentUser(req)});
});

// TODO Check that no other user has email or username
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
			req.login(user, err => {
				if (err) {
					console.error(err)
					console.error("Error signing in new user")
					res.redirect("/signIn")
				} else {
					res.redirect("/")
				}
			})
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