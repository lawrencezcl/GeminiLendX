// AI Controller for Gemini AI Intelligent Assistance Module
const GeminiService = require('../services/gemini.service');
const ZetaChainService = require('../services/zetchain.service');
const PriceService = require('../services/price.service');

class AIController {
  constructor() {
    this.geminiService = new GeminiService();
    this.zetaService = new ZetaChainService();
    this.priceService = new PriceService();
  }

  /**
   * Parse natural language lending request
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async parseLendingRequest(req, res) {
    try {
      const { userInput } = req.body;
      
      // Validate input
      if (!userInput) {
        return res.status(400).json({
          success: false,
          error: 'Missing required field: userInput'
        });
      }
      
      // Parse the natural language request using Gemini
      const parsedRequest = await this.geminiService.parseLendingRequest(userInput);
      
      res.json({
        success: true,
        data: parsedRequest,
        message: 'Lending request parsed successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Calculate user's credit score
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async calculateCreditScore(req, res) {
    try {
      const { userId } = req.params;
      
      // Validate input
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'Missing required parameter: userId'
        });
      }
      
      // In a real implementation, we would fetch user data from database
      // For now, we'll simulate with sample data
      const userData = {
        userId,
        transactionHistory: [
          { type: 'repayment', amount: 500, status: 'completed' },
          { type: 'repayment', amount: 1000, status: 'completed' },
          { type: 'repayment', amount: 750, status: 'completed' }
        ],
        collateralHistory: [
          { asset: 'SOL', amount: 1.5 },
          { asset: 'BTC', amount: 0.01 }
        ],
        repaymentRate: 0.95,
        collateralVolatility: 0.15,
        endorsements: 2,
        chainsUsed: 3
      };
      
      const creditScore = await this.geminiService.calculateCreditScore(userData);
      
      res.json({
        success: true,
        data: creditScore,
        message: 'Credit score calculated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Generate asset allocation recommendations
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async generateRecommendations(req, res) {
    try {
      // Fetch current market data
      const gasPrices = await this.zetaService.getGasPrices();
      const marketData = await this.priceService.getCoingeckoData(['solana', 'ethereum', 'base', 'avalanche']);
      
      const combinedData = {
        gasFees: gasPrices,
        liquidity: {}
      };
      
      // Combine liquidity data
      Object.keys(marketData).forEach(chain => {
        combinedData.liquidity[chain] = marketData[chain].liquidity;
      });
      
      const recommendations = await this.geminiService.generateRecommendations(combinedData);
      
      res.json({
        success: true,
        data: recommendations,
        message: 'Asset allocation recommendations generated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get AI-powered loan advice
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async getLoanAdvice(req, res) {
    try {
      const { loanRequest } = req.body;
      
      // Validate input
      if (!loanRequest) {
        return res.status(400).json({
          success: false,
          error: 'Missing required field: loanRequest'
        });
      }
      
      // In a real implementation, this would call the Gemini API for advice
      // For now, we'll simulate the response
      const advice = {
        riskAssessment: "Medium risk - collateral value is 1.5x the loan amount",
        suggestedTerms: "30-day term with 5.5% interest rate",
        recommendedChain: "Base (low gas fees, high liquidity)",
        alternativeOptions: [
          "60-day term with 4.5% interest rate",
          "15-day term with 6.5% interest rate"
        ]
      };
      
      res.json({
        success: true,
        data: advice,
        message: 'Loan advice generated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = AIController;