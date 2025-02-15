const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('Draw', drawSchema);
