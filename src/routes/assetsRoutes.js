// Assuming you have an Express app set up
const express = require('express');
const router = express.Router();
const { getAllAssets, addAssets, updateAssets, deleteAssets } = require('../service/assetService'); // Adjust the path as necessary

router.get('/assets', async (req, res) => {
    try {
        const assets = await getAllAssets();
        res.json(assets);
    } catch (error) {
        res.status(500).send("An error occurred while fetching assets.");
    }
});

router.post('/assets', async (req, res) => {
    try {
        const { userId, addedAssets, updatedAssets, deletedAssets } = req.body;

        // Handle added assets
        if (addedAssets && addedAssets.length > 0) {
            await addAssets(userId, addedAssets);
        }

        // Handle updated assets
        if (updatedAssets && updatedAssets.length > 0) {
            console.log(updatedAssets);
            await updateAssets(updatedAssets);
        }

        // Handle deleted assets
        if (deletedAssets && deletedAssets.length > 0) {
            await deleteAssets(deletedAssets);
        }

        res.status(200).json({ message: 'Assets processed successfully' });
    } catch (error) {
        console.error('Error processing assets:', error);
        res.status(500).json({ error: 'Failed to process assets' });
    }
});

router.post('/assets/:userId', async (req, res) => {
    try {
        const assets = await getAssetsByUserId(req.body);
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).send("An error occurred while fetching assets.");
    }
});

module.exports = router;
