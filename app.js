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

const http = require("http"); // Handles the https requests
const fs = require("fs"); // File handler
const port = 3000;
const path = __dirname

const sendFile = function (file, res, code = 200) {
	res.writeHead(code, {"Content-Type": "text/html"});
	console.log(file)
	fs.readFile((path + file), function (error, data) {
		if (error) {
			res.writeHead(404);
			res.write("Error: File Not Found");
		} else {
			res.write(data);
		}
		res.end();
	});
};

const server = http.createServer(function (req, res) {
	// Anytime a request is made, it runs through here
	if (req.url === "/") {
		sendFile("/index.html", res);
	} else {
		sendFile((req.url), res);
	}
});

server.listen(port, function (error) {
	if (error) {
		console.log("Something went wrong", error);
	} else {
		console.log("Server is listening on port " + port);
	}
});
