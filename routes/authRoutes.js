const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

let getCurrentUser;
init = getCurrentUserFunc => getCurrentUser = getCurrentUserFunc;

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


// TODO Place into tools.js
async function getUser(usernameEmail) {
	let searchOptions = {};
	if (usernameEmail.includes('@')) {
		searchOptions.email = usernameEmail
	} else {
		searchOptions.username = usernameEmail
	}

	try {
		const user = await User.findOne(searchOptions)
		return user
	} catch(e) {
		console.error("Error in ", __filename);
		console.log(e)
	}
}

// TODO Return user only and have passport-config.js handle the done
async function getUserByID(ID, done) {
	return await User.findById( ID, async (err, user) => {
	  if(err){
		  return done(null, false, {error:err});
	  } else {
		  return done(null, user);
	  }
	});
}

function checkAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect("/signin")
}

function checkNotAuth(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect("/account")
	}
	next()
}

module.exports = {init, router, getUser, getUserByID, checkAuth, checkNotAuth};