// Routes for Cross-Chain Lending Execution Module
const express = require('express');
const router = express.Router();
const LendingController = require('../controllers/lending.controller');

const lendingController = new LendingController();

// Initiate a new loan
router.post('/loans/initiate', lendingController.initiateLoan);

// Repay a loan
router.post('/loans/repay', lendingController.repayLoan);

// Liquidate an under-collateralized loan
router.post('/loans/liquidate', lendingController.liquidateLoan);

// Get loan details
router.get('/loans/:loanId', lendingController.getLoanDetails);

module.exports = router;