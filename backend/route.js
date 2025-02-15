const express = require('express');
const Draw = require('./models/Draw');
const router = express.Router();

// Generate a random number between 2-100
const generateRandomNumber = () => Math.floor(Math.random() * 99) + 2;

// Get last 14 draws
router.get('/history', async (req, res) => {
    const draws = await Draw.find().sort({ _id: -1 }).limit(14);
    res.json(draws);
});

// Generate new lucky draw numbers at 4PM
router.post('/generate', async (req, res) => {
    const num1 = generateRandomNumber();
    const num2 = generateRandomNumber();
    const today = new Date().toLocaleDateString();

    await Draw.create({ number: num1, date: today });
    await Draw.create({ number: num2, date: today });

    // Ensure only the last 14 days are stored
    const count = await Draw.countDocuments();
    if (count > 28) {
        const oldestDraws = await Draw.find().sort({ _id: 1 }).limit(count - 28);
        await Draw.deleteMany({ _id: { $in: oldestDraws.map(d => d._id) } });
    }

    res.json({ success: true, num1, num2 });
});

module.exports = router;
