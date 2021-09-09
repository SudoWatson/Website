import { exec, spawn } from "child_process";
import nodegit from "nodegit";
import path from "path";
import fs from "fs";
import User from "./models/user.js";
/**
 * Returns the username and email of the current user under the current session
 * @param {*} req
 * @returns user
 */
function getCurrentUser(req) {
    // Sets information about the user in the req field to be used
    if (req.user === undefined) {
        return undefined;
    }
    return {
        username: req.user.username,
        email: req.user.email,
    };
}
/**
 * Testing callback function to place into bash(command, bashback) to return stdout and err
 */
function bashback(err, stdout, stderr) {
    if (err) {
        console.error(stderr);
    }
    else {
        console.log(stdout);
    }
}
/**
 * Runs a bash command
 * @param {string} command
 * @param {Function} callback
 * @returns child_process.exec
 */
function bat(command, callback = bashback) {
    return exec("batch\\" + command, callback);
}
/**
 * Finds the user associated with 'usernameEmail' in database
 * @param {string} usernameEmail
 * @returns {User} user
 */
async function getUser(usernameEmail) {
    // Returns User object from given Username or Email
    let searchOptions = {};
    if (usernameEmail.includes("@")) {
        searchOptions.email = usernameEmail;
    }
    else {
        searchOptions.username = usernameEmail;
    }
    try {
        const user = await User.findOne(searchOptions);
        return user;
    }
    catch (e) {
        // No user found
        return null;
    }
}
/**
 * Finds the user associated the the ID in database
 * @param {string} ID
 * @returns user
 */
async function getUserByID(ID) {
    return await User.findById(ID, async (err, user) => {
        if (err) {
            console.error(err);
            return err;
        }
        else {
            return user;
        }
    });
}
/**
 * Middleware to ensure user is logged in before continuing to a page
 */
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/signIn");
}
/**
 * Middleware to ensure user is NOT logged in before continuing to a page
 */
function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/account");
    }
    next();
}
/**
 * Clones the git repository 'repoURL' to file "./runnables/'localFile'"
 * @param {string} repoURL
 * @param {string} localFile
 * @param {Function} callback
 */
function cloneGit(repoURL, localFile, callback) {
    console.log("CLONING GIT");
    nodegit
        .Clone(repoURL, path.join("./runnables", localFile))
        .then(function (repo) {
        console.log("Cloned " + path.basename(repoURL) + " to " + repo.workdir());
        callback();
    })
        .catch(function (err) {
        console.log(err);
    });
}
/**
 * Runs a python script with optional paramaters
 * @param {string} script
 * @param {array} params
 */
function runPython(script, params = []) {
    spawn("python", [...script, ...params]);
}
/**
 * Removes the directory of the included runnable
 * @param {String} runnable
 */
async function rmRunnable(runnable) {
    fs.rmdir(path.join("./runnables", runnable), { recursive: true }, (err) => {
        if (err) {
            console.error(`Error removing runnable directory ${runnable}`);
            console.error(err);
        }
    });
}
export { getCurrentUser, bat, bashback, getUserByID, getUser, checkAuth, checkNotAuth, cloneGit, rmRunnable, };
