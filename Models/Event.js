const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
}, {
    timestamps: true
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;