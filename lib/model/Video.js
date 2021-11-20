const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishedOn: {
        type: Date,
        required: true
    },
    thumbnailURL: {
        type: String,
        required: true
    },
    ytId: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model( "Video", VideoSchema );