const mongoose = require('mongoose');

const DrawSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Draw', DrawSchema);
