import cron from "node-cron"

import {bat} from "./tools.js"

import Runnable from "./models/runnable.js"


let schedules = {}

/**
 * Schedules the provided runnable to run
 * @param {Runnable} runnable Runnable to schedule for running
 */
function scheduleRunnable(runnable) {
    if (runnable.runStyle.includes("schedule")) {
        console.log(`Creating cron schedule: ${runnable.schedule}`);
        let command = `run.bat ${runnable.fileName} ${runnable.main}`
        let task = cron.schedule(runnable.schedule, function (runnable) {
            console.log("Running cron")
            const runProgram = bat(command)
        });

        schedules[runnable.fileName] = task
    }
}

/**
 * Updates the schedule of provided runnable
 * @param {Runnable} runnable Runnable to update schedule
 */
function updateSchedule(runnable) {
    unscheduleRunnables(runnable);
    scheduleRunnable(runnable);
}

/**
 * Unschedules the provided runnable from being ran
 * @param {Runnable} runnable Runnable to unschedule
 */
function unscheduleRunnable(runnable) {
    if (runnable.fileName in schedules) {
        schedules[runnable.fileName].stop();
        delete schedules[runnable.fileName]
    }
}

/**
 * Create Schedules for Runnables on startup
 */
async function scheduleRunnables() {
	try {
		const runnables = await Runnable.find({});
		runnables.forEach(runnable => {
			if (runnable.runStyle.includes("schedule")) {
				scheduleRunnable(runnable)
			}
		})
	} catch (e) {
		console.error(e)
		console.error("Issue in tools.js when getting runnables possibly")
	}
}

/**
 * Unschedules all scheduled runnables
 */
function unscheduleRunnables() {
    for (const [key, value] of Object.entries(schedules)) { 
        schedules[key].stop()
    }
}



export {
    updateSchedule,
    scheduleRunnable,
	scheduleRunnables,
    unscheduleRunnable,
    unscheduleRunnables
};
