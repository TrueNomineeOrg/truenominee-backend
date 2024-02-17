// Assuming you have an Express app set up
const express = require('express');
const router = express.Router();
const { getAllAssets, addAssets, updateAssets, deleteAssets, getAssetsByUserId } = require('../service/assetService');
const { addNominees, updateNominees, deleteNominees, getNomineesByUserId } = require('../service/nomineeService');


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

        const latestAssets = await getAssetsByUserId(userId);
        res.json(latestAssets);
    } catch (error) {
        console.error('Error processing assets:', error);
        res.status(500).json({ error: 'Failed to process assets' });
    }
});

router.get('/assets/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const assets = await getAssetsByUserId(userId);
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user assets", error: error.toString() });
    }
});

router.post('/nominees', async (req, res) => {
    const { userId, addedNominees, updatedNominees, deletedNominees } = req.body;

    try {
        // Handle added nominees
        if (addedNominees && addedNominees.length) {
            await addNominees(userId, addedNominees);
        }

        // Handle updated nominees
        if (updatedNominees && updatedNominees.length) {
            await updateNominees(updatedNominees);
        }

        // Handle deleted nominees
        if (deletedNominees && deletedNominees.length) {
            await deleteNominees(deletedNominees);
        }

        const nominees = await getNomineesByUserId(userId);
        res.json(nominees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update nominee information.', error: error.message });
    }
});

router.get('/nominees/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const nominees = await getNomineesByUserId(userId);
        res.json(nominees);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user nominees", error: error.toString() });
    }
});

module.exports = router;
