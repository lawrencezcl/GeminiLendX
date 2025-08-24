// Routes for Cross-Chain Asset Integration Module
const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/asset.controller');

const assetController = new AssetController();

// Get user's cross-chain asset view
router.get('/assets/:userAddress', assetController.getAssetView);

// Map asset for collateral
router.post('/assets/map', assetController.mapAsset);

// Unmap asset after repayment
router.post('/assets/unmap', assetController.unmapAsset);

// Monitor asset health
router.get('/assets/health/:userAddress', assetController.monitorAssetHealth);

module.exports = router;