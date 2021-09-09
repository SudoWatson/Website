

import path from "path"
import express from "express"
import bodyParser from "body-parser"
import expressLayouts from "express-ejs-layouts"
const port = 3000;
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
import * as tools from "./tools.js"

const app = express();
app.set("view-engine", "ejs");
app.set("layout", "partials/base.ejs");
app.use(expressLayouts);
app.use(express.static("public"));  // When linking CSS file, must include beginning '/' EX: "/base.css"
app.use(bodyParser.urlencoded({limit: "10mb", extended: false}));
app.get("/", (req, res) => {
	// app.get(url, (req, res) { Stuff to do for that URL })
	res.render("runnables/runnables.ejs", {runnables:[],user: tools.getCurrentUser(req)});
});
app.listen(port, console.log(`Listening on port ${port}`));