import bcrypt from "bcrypt"
import {Strategy as localStrategy} from "passport-local"


async function init(passport, getUserByEmail, getUserByID) {
	const authenticateUser = async (email, password, done) => {
		const user = await getUserByEmail(email);
		if (user == null) {
			return done(null, false, {message: "Username or Email not found"});
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, {message: "Incorrect Password"});
			}
		} catch (err) {
			console.error("Error in ", __filename);
			return done(err);
		}
		console.log("This shouldn't ever print. In passport-configs.js");
	};
	passport.use(
		new localStrategy({usernameField: "userName"}, authenticateUser)
	);
	passport.serializeUser((user, done) => {
		return done(null, user._id);
	});
	passport.deserializeUser(async (id, done) => {
		user = await getUserByID(id);
		if (user == null) {
			return done(null, false, {error: "User doesn't exist"});
		} else {
			return done(null, user);
		}
	});
}

module.exports = init;
