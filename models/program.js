const mongoose = require("mongoose");

const programsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    imageURL: {
        type: String,
        required: true
    }
});

//                            Collection   Schema format
module.exports = mongoose.model("programs", programsSchema);