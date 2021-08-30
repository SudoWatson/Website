/*
Login screen to login as admin
Portfolio of what I've done
If admin is logged in, allow editing or adding

Runnables contains all the different scripts and programs that the web server will manage
EX: Crypto price gathering
AI Hosting
etc
If admin is logged in, allow editing or adding runnables

Runnables manager
Run constantly
Record time
All runnables contain a schedule.json(?)
All runnables begin with a run.py(?)
If the runnable's schedule time is after the previous recorded time but before the current time, run
*/

/* TODO	Properly create snippets
	https://code.visualstudio.com/docs/editor/userdefinedsnippets
	Properly create extra snippets
	Try using LINE_COMMENT for snippet comments
	Try using TM_FILENAME_BASE for schema name
	Change snippets to require tools, then set getCurrentUser to tools.etc
*/

// TODO Add error message partial

// TODO Use /** for function summaries */

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// Modules
const express = require("express");
const fs = require("fs"); // File handler
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const slug = require("slug")

const initPassport = require("./passport-config");
const tools = require("./tools");

// Import sets
const checkAuth = tools.checkAuth,
	  checkNotAuth = tools.checkNotAuth;
const getCurrentUser = tools.getCurrentUser;

// Routes
const accountRoutes = require("./routes/account");
const programsRoute = require("./routes/programs");
const runnablesRoute = require("./routes/runnables");

// Misc. Server Info
const path = require("path");
const port = process.env.PORT || 3000;

// Express Setup
const app = express();
app.set("view-engine", "ejs");
app.set("layout", "partials/base.ejs");
app.use(expressLayouts);
app.use(express.static(__dirname+"/public"));  // When linking CSS file, must include beginning '/' EX: "/base.css"
app.use(bodyParser.urlencoded({limit: "10mb", extended: false}));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method")); // Allows us to send DELETE and PUT from forms. _method= in URL overrides the actual form method

// Passport Setup
initPassport(passport, tools.getUser, tools.getUserByID);

// MongoosDB Setup
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// ----============= SERVER REQUESTS GO THROUGH HERE =============----
app.get("/", (req, res) => {
	// app.get(url, (req, res) { Stuff to do for that URL })
	res.render("index.ejs", {user: getCurrentUser(req)});
});

app.use("/runnables", runnablesRoute)

app.get("/signIn", accountRoutes);
app.all(["/signUp", "/logOut", "/account"], accountRoutes);
app.post(	// TODO Redirect to previous URL after sign in
	"/signIn",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/signIn",
		failureFlash: true,
	})
);

app.use("/programs", programsRoute)

app.listen(port, console.log(`Listening on port ${port}`));
