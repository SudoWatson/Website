import mongoose from "mongoose"
import path from "path";

const coverImageUploadPath = "runnableCovers";

const runnablesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	fileName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	imageName: {
		type: String,
		required: true,
	},
	links: {
		type: Object,
		required: true,
	},
	schedule: {
		type: Object,
		required: false,
	},
	autoUpdateOnRun: {
		type: Boolean,
		required: true,
	},
	main: {
		type: String,
		required: true,
	},
	runStyle: {
		type: Array,
		required: true,
	},
	tags: {
		type: Array,
		required: false,
	},
	roleAccess: {
		type: Array,
		require: false,
	},
});

// Virtual Properties
runnablesSchema.virtual("imagePath").get(function () {
	if (this.imageName != null) {
		return path.join("/", coverImageUploadPath, this.imageName);
	}
});

let runnablesModel = mongoose.model("runnables", runnablesSchema);
export {runnablesModel as default, coverImageUploadPath as imageBasePath};
