const mongoose = require("mongoose");
const path = require("path")

const coverImageUploadPath = "runnableCovers"

const runnablesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    imageName: {
        type: String,
        required: true
    },
    links: {
        type: Object,
        required: true
    },
    schedule: {
        type: Object,
        required: false
    },
    autoUpdateOnRun: {
        type: Boolean,
        required: true
    },
    runPath: {
        type: String,
        required: true
    },
    runStyle: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: false
    }
});

// Virtual Properties
runnablesSchema.virtual("imagePath").get(function() {
    if (this.imageName != null) {
        return path.join('/', coverImageUploadPath, this.imageName)
    }
})

//                            Collection   Schema format
module.exports = mongoose.model("runnables", runnablesSchema);
module.exports.imageBasePath = coverImageUploadPath