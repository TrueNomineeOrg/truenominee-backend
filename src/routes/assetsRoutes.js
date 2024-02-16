// Assuming you have an Express app set up
const express = require('express');
const router = express.Router();
const { getAllAssets } = require('../service/assetService'); // Adjust the path as necessary

router.get('/assets', async (req, res) => {
    try {
        const assets = await getAllAssets();
        res.json(assets);
    } catch (error) {
        res.status(500).send("An error occurred while fetching assets.");
    }
});

module.exports = router;
