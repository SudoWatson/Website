import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: {
		type: Array,
		required: true
	},
});

let userModel = mongoose.model("users", userSchema)
export {userModel as default}
