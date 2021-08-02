const exec = require('child_process').exec;
const spawn = require('child_process').spawn

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

// function bash(command, callback) {
// 	command = command.split(' ')
// 	const bashmand = spawn(command[0], command.slice(1));

// 	bashmand.stdout.on('data', (data) => {
// 		console.log(`stdout: ${data}`);
// 	})

// 	bashmand.stderr.on('data', (data) => {
// 	  console.error(`stderr: ${data}`);
// 	});
// }

module.exports = {getCurrentUser, bash};
