const mongoose = require("mongoose");

const runnablesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

//                            Collection   Schema format
module.exports = mongoose.model("runnables", runnablesSchema);