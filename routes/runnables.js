// Require Packages
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const slug = require("slug");
const methodOverride = require("method-override");

const bash = require("../tools").bash;
const getCurrentUser = require("../tools").getCurrentUser

// Require Models (If any)
const Runnable = require("../models/runnable");


// Other Setup
const imgExtensionTypes = ["image/jpeg", "image/png"];
const uploadPath = path.join("public", Runnable.imageBasePath);
const upload = multer({
	dest: uploadPath,
	fileFilter: (req, file, callback) => {
		callback(null, imgExtensionTypes.includes(file.mimetype));
	},
});

// Uses
router.use(methodOverride("_method"))

// Routes
router.get("/", async (req, res) => {
	try {
		const runnables = await Runnable.find({});
		res.render("runnables/runnables.ejs", {
			runnables: runnables,
			user: getCurrentUser(req),
		});
	} catch (e) {}
});

router.post("/", upload.single("cover"), async (req, res) => {
	const formData = req.body;
	let runStyle = [];
	if (formData.manual) runStyle.push("manual");
	if (formData.schedule) runStyle.push("schedule");

	const fileName = slug(formData.title);
	const coverName = req.file != null ? req.file.filename : null;

	// Test of the Link system
	let links = {};
	linkName = formData.links.replace("https://", "").slice(0, -4); // Removes 'https://' as well as potential '.git'
	linkName = linkName.split(".");
	if (linkName.length - 1 >= 2) {
		linkName = linkName[1];
	} else {
		linkName = linkName[0];
	}

	linkData = {[linkName]: formData.links};
	// End Link system

	const runnable = new Runnable({
		title: formData.title,
		fileName: fileName,
		description: formData.description,
		imageName: coverName,
		links: linkData,
		schedule: null,
		autoUpdateOnRun: formData.autoUpdate === "on",
		runPath: formData.runPath,
		runStyle: runStyle,
		tags: formData.tags.split(/\s+/),
	});

	try {
		const newRunnable = await runnable.save();
		bash(
			`bash getRunnable.bash ${runnable.links["github"]} ${runnable.fileName}`,
			function (err, stdout, stderr) {
				if (err) {
					console.error(stderr);
				} else {
					console.log(stdout);
				}
			}
		);

		res.redirect(`/runnables/${runnable.fileName}`);
	} catch (e) {
		console.error("Error in ", __filename);
		console.error(e);
		if (coverName != null) {
			fs.unlink(path.join(uploadPath, coverName), (e2) => {
				if (e2) {
					console.error("Error deleting runnable cover");
					consol.error(e2);
				}
			});
		}
		res.render("/runnables/new");
	}
});

router.get("/new", (req, res) => {
	res.render("runnables/newRunnable.ejs", {
		runnable: new Runnable(),
		user: getCurrentUser(req)
	});
});

// Methods for Individual Runnables
router.get("/:id", async (req, res) => {
	try {
		const runnable = await Runnable.findOne({fileName: req.params.id})
		res.render("runnables/runnable.ejs",{
			runnable: runnable,
			user: getCurrentUser(req)
		});
	} catch {
		res.send("Uh oh")
	}
});

router.get("/:id/edit", async (req, res) => {
	try {
		const runnable = await Runnable.findOne({fileName: req.params.id})
		res.render("runnables/editRunnable.ejs",{
			runnable: runnable,
			user: getCurrentUser(req)
		});
	} catch {
		res.send("Uh oh")
	}
});

router.put("/:id", async (req, res) => {
	const formData = req.body;
	let runStyle = [];
	if (formData.manual) runStyle.push("manual");
	if (formData.schedule) runStyle.push("schedule");

	// // Test of the Link system
	// let links = {};
	// linkName = formData.links.replace("https://", "").slice(0, -4); // Removes 'https://' as well as potential '.git'
	// linkName = linkName.split(".");
	// if (linkName.length - 1 >= 2) {
	// 	linkName = linkName[1];
	// } else {
	// 	linkName = linkName[0];
	// }

	// linkData = {[linkName]: formData.links};
	// End Link system

	let runnable;

	try {
		runnable = await Runnable.findOne({fileName: req.params.id})
		runnable.title = req.body.title;
		runnable.description = formData.description;
		runnable.runPath = formData.runPath;
		runnable.autoUpdateOnRun = formData.autoUpdate === "on";
		runnable.runStyle = runStyle
		await runnable.save();
		bash(
			`bash runnables/${runnable.fileName}/update.bash`,
			function (err, stdout, stderr) {
				if (err) {
					console.error(stderr);
				} else {
					console.log(stdout);
				}
			}
		);

		res.redirect(`/runnables/${runnable.fileName}`)
	} catch (e) {
		if (runnable == null) {
			res.redirect('/runnables')
		} else {
			res.redirect(`/runnables/${runnable.fileName}/edit`)
		}


		console.error("Error in ", __filename);
		console.error(e);
	}
});

router.delete("/:id", async (req, res) => {
	const formData = req.body;
	let runnable;

	try {
		runnable = await Runnable.findOne({fileName: req.params.id})
		await runnable.remove();
		bash(
			`bash rm.bash runnables/${runnable.fileName}`,
			function (err, stdout, stderr) {
				if (err) {
					console.error(stderr);
				} else {
					console.log(stdout);
				}
			}
		);

		fs.unlink(path.join(uploadPath, runnable.imageName), (e2) => {
			if (e2) {
				console.error("Error deleting runnable cover");
				consol.error(e2);
			}
		});

		res.redirect("/runnables")
	} catch (e) {
		if (runnable == null) {
			res.redirect('/runnables')
		} else {
			res.redirect(`/runnables/${runnable.fileName}`)
		}


		console.error("Error in ", __filename);
		console.error(e);
	}
});

// Exports
module.exports = router;
