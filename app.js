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

const initPassport = require("./passport-config");
const tools = require("./tools");

const authen = require("./routes/authRoutes");
const programs = require("./routes/programs");
const runnables = require("./routes/runnables");

// Import sets
const checkAuth = authen.checkAuth,
	  checkNotAuth = authen.checkNotAuth;
const getCurrentUser = tools.getCurrentUser;

// Routes
const authRoutes = authen.router;
const programsRoute = programs.router;
const runnablesRoute = runnables.router;

//Route inits
authen.init(getCurrentUser);
programs.init(getCurrentUser);
runnables.init(getCurrentUser);

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
initPassport(passport, authen.getUser, authen.getUserByID);

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

app.get("/account", checkAuth, (req, res) => {
	res.render("account/account.ejs", {user: getCurrentUser(req)});
});

app.get("/signup", authRoutes);
app.get("/signin", authRoutes);
app.post("/signup", authRoutes);
app.post(
	"/signin",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/signin",
		failureFlash: true,
	})
);
app.delete("/logOut", authRoutes);

app.use("/runnables", runnablesRoute)
app.use("/programs", programsRoute)

app.listen(port, console.log(`Listening on port ${port}`));
