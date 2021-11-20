const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    title: String,
    description: String,
    publishedOn: Date,
    thumbnailURL: String
});

module.exports = mongoose.model("Video", VideoSchema);