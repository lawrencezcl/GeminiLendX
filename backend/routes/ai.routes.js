// Routes for Gemini AI Intelligent Assistance Module
const express = require('express');
const router = express.Router();
const AIController = require('../controllers/ai.controller');

const aiController = new AIController();

// Parse natural language lending request
router.post('/ai/parse-request', aiController.parseLendingRequest);

// Calculate user's credit score
router.get('/ai/credit-score/:userId', aiController.calculateCreditScore);

// Generate asset allocation recommendations
router.get('/ai/recommendations', aiController.generateRecommendations);

// Get AI-powered loan advice
router.post('/ai/loan-advice', aiController.getLoanAdvice);

module.exports = router;