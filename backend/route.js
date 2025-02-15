const express = require('express');
const router = express.Router();
const Draw = require('./models/Draw');

// Route to get all draws (last 14 days)
router.get('/', async (req, res) => {
    try {
        const draws = await Draw.find().sort({ date: -1 }).limit(14);
        res.json(draws);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

// Route to add a new draw number
router.post('/', async (req, res) => {
    try {
        const { number } = req.body;
        const newDraw = new Draw({ number });
        await newDraw.save();

        // Delete old records if more than 14 days
        const allDraws = await Draw.find().sort({ date: -1 });
        if (allDraws.length > 14) {
            await Draw.findOneAndDelete({ _id: allDraws[allDraws.length - 1]._id });
        }

        res.status(201).json(newDraw);
    } catch (error) {
        res.status(500).json({ message: "Error saving data" });
    }
});

module.exports = router;
