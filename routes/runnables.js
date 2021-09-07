// Require Packages
const express = require("express");
const router = express.Router();
const multer = require("multer");const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");
const slug = require("slug");
const methodOverride = require("method-override");
const cron = require("node-cron");

const {bash, bashback, getCurrentUser, cloneGit, runPython, rmRunnable} = require("../tools")


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
router.use(methodOverride("_method"));

// Routes
router.get("/", async (req, res) => {  // View all runnables
	try {
		const runnables = await Runnable.find({});
		res.render("runnables/runnables.ejs", {
			runnables: runnables,
			user: getCurrentUser(req),
		});
	} catch (e) {}
});

/** Add New Runnable Program */
router.post("/", upload.single("cover"), async (req, res) => {
	const formData = req.body;
	let runStyle = [];
	if (formData.manual) runStyle.push("manual");
	if (formData.runSchedule) runStyle.push("schedule");

	// Create cover image name
	let fileName = slug(formData.title);
	let i = 0
	while (fs.existsSync(`./runnables/${fileName}`)) {  // Relative to path of app.js, likely because that's where the console working directory is
		i++;
		fileName = slug(formData.title);
		fileName = fileName + i.toString();
	}
	const coverName = req.file != null ? req.file.filename : null;

	// Test of the Link system
	// TODO going to have to change
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
		schedule: formData.schedule,
		autoUpdateOnRun: formData.autoUpdate === "on",
		main: formData.mainPath,
		runStyle: runStyle,
		tags: formData.tags.split(/\s+/)
	});
	
	try {  // Adding runnable
		const newRunnable = await runnable.save();

		// Clone repo from Git, set Schedule if needed
		if (runnable.links["github"] !== undefined) {
			cloneGit(runnable.links["github"], runnable.fileName, () => {
				const newVenv = exec((`batch\\newVenv.bat ${runnable.fileName}`), bashback);
				newVenv.on("close", () => {
					if (runnable.runStyle.includes("schedule")) {
						console.log(`Creating cron schedule: ${runnable.schedule}`)
						cron.schedule(runnable.schedule, function() {
							console.log("Executing command -----")
							const runProg = exec((`batch\\run.bat ${runnable.fileName} ${runnable.main}`), bashback);
						});
					}
				})
				// const newVenv = exec((`bash ./bash/newVenv.bash ${runnable.fileName}`), bashback);
				// newVenv.on("close", () => {
				// 	if (runnable.runStyle.includes("schedule")) {
				// 		console.log(`Creating cron schedule: ${runnable.schedule}`)
				// 		cron.schedule(runnable.schedule, function() {
				// 			console.log("Executing command -----")
				// 		});
				// 	}
				// })
			})

			
		}
		

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
		rmRunnable(runnable.fileName)
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
router.get("/:id", async (req, res) => {  // Runnable page
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

router.get("/:id/edit", async (req, res) => {  // Edit page for runnable
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

router.put("/:id", async (req, res) => {  // Update runnable
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
		console.log(runnable)
		runnable.title = req.body.title;
		runnable.description = formData.description;
		runnable.main = formData.main;
		runnable.autoUpdateOnRun = formData.autoUpdate === "on";
		runnable.schedule = formData.schedule;
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

router.delete("/:id", async (req, res) => {  // Delete runnable
	const formData = req.body;
	let runnable;

	try {
		runnable = await Runnable.findOne({fileName: req.params.id})
		try {
			await runnable.remove();
		} catch {
			if (runnable == null) {  // Runnable doesn't exist
				return res.redirect("/runnables")
			}
		}

		rmRunnable(runnable.fileName)
		fs.unlink(path.join(uploadPath, runnable.imageName), (e2) => {
			if (e2) {
				console.error("Error deleting runnable cover");
				console.error(e2);
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
