const exec = require('child_process').exec;
const spawn = require('child_process').spawn

const User = require("./models/user.js")

function getCurrentUser(req) {
	if (req.user === undefined) {
		return undefined
	}
	return {
		username: req.user.username,
		email: req.user.email
	}
}

function bash(command, callback) {
	exec(command, callback)
}

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

// TODO Return 'user' only and have passport-config.js handle the done
async function getUserByID(ID, done) {
	return await User.findById(ID, async (err, user) => {
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


module.exports = {getCurrentUser, bash, getUserByID, getUser, checkAuth, checkNotAuth};
