// Google Gemini AI Service for intelligent assistance
const axios = require('axios');

class GeminiService {
  constructor() {
    // Initialize service with API key
    this.apiKey = process.env.GEMINI_API_KEY;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Parse natural language lending request
   * @param {string} userInput - User's natural language request
   * @returns {Promise<Object>} Parsed lending request schema
   */
  async parseLendingRequest(userInput) {
    // Implementation for parsing lending requests with Gemini Pro API
    try {
      // In a real implementation, this would call the actual Gemini API
      // For now, we simulate the parsing with sample data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Parse the user input to extract key information
      const parsedRequest = {
        collateral_asset: this.extractCollateralAsset(userInput),
        borrow_asset: this.extractBorrowAsset(userInput),
        amount: this.extractAmount(userInput),
        loan_term: this.extractLoanTerm(userInput),
        chain_preference: this.extractChainPreference(userInput),
        risk_tolerance: this.extractRiskTolerance(userInput)
      };
      
      return parsedRequest;
    } catch (error) {
      throw new Error(`Failed to parse lending request: ${error.message}`);
    }
  }

  /**
   * Calculate cross-chain credit score
   * @param {object} userData - User's transaction history and data
   * @returns {Promise<Object>} Credit score and explanation
   */
  async calculateCreditScore(userData) {
    // Implementation for credit scoring with Gemini
    try {
      // In a real implementation, this would call the actual Gemini API
      // For now, we simulate the calculation with sample data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate credit score based on user data
      let score = 600; // Base score
      let explanation = "Base credit score of 600";
      
      // Adjust score based on repayment rate (40% weight)
      if (userData.repaymentRate >= 0.95) {
        score += 170; // 40% of 850-300=550 range
        explanation += ", high repayment rate (40%)";
      } else if (userData.repaymentRate >= 0.85) {
        score += 110;
        explanation += ", good repayment rate (40%)";
      } else if (userData.repaymentRate >= 0.75) {
        score += 55;
        explanation += ", average repayment rate (40%)";
      }
      
      // Adjust score based on collateral volatility (30% weight)
      if (userData.collateralVolatility <= 0.1) {
        score += 110; // 30% of 550 range
        explanation += ", low collateral volatility (30%)";
      } else if (userData.collateralVolatility <= 0.25) {
        score += 77;
        explanation += ", moderate collateral volatility (30%)";
      }
      
      // Adjust score based on social endorsements (20% weight)
      if (userData.endorsements >= 3) {
        score += 90; // 20% of 550 range
        explanation += ", multiple endorsers (20%)";
      } else if (userData.endorsements >= 1) {
        score += 45;
        explanation += ", some endorsers (20%)";
      }
      
      // Adjust score based on multi-chain activity (10% weight)
      if (userData.chainsUsed >= 3) {
        score += 55; // 10% of 550 range
        explanation += ", diversified chain usage (10%)";
      } else if (userData.chainsUsed >= 2) {
        score += 28;
        explanation += ", moderate chain usage (10%)";
      }
      
      // Ensure score is within bounds
      score = Math.max(300, Math.min(850, score));
      
      const creditScore = {
        score: Math.round(score),
        explanation: `Your score is ${Math.round(score)} - ${explanation}`
      };
      
      return creditScore;
    } catch (error) {
      throw new Error(`Failed to calculate credit score: ${error.message}`);
    }
  }

  /**
   * Generate asset allocation recommendations
   * @param {object} marketData - Current market conditions
   * @returns {Promise<Array>} Asset allocation recommendations
   */
  async generateRecommendations(marketData) {
    // Implementation for generating recommendations with Gemini
    try {
      // In a real implementation, this would call the actual Gemini API
      // For now, we simulate the generation with sample data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate recommendations based on market data
      const recommendations = [];
      
      // Compare gas fees and recommend lowest cost chains
      const gasFees = marketData.gasFees;
      const lowestGasChain = Object.keys(gasFees).reduce((a, b) => gasFees[a] < gasFees[b] ? a : b);
      
      recommendations.push({
        chain: lowestGasChain,
        reason: `Low gas fees ($${gasFees[lowestGasChain].toFixed(2)})`,
        savings_estimate: `$${(gasFees.solana * 100 - gasFees[lowestGasChain] * 100).toFixed(2)} saved over 30 days for 100 transactions`
      });
      
      // Compare liquidity and recommend highest liquidity pools
      const liquidity = marketData.liquidity;
      const highestLiquidityChain = Object.keys(liquidity).reduce((a, b) => liquidity[a] > liquidity[b] ? a : b);
      
      recommendations.push({
        chain: highestLiquidityChain,
        reason: `High liquidity ($${(liquidity[highestLiquidityChain] / 1000000).toFixed(1)}M)`,
        savings_estimate: "Faster loan matching and better execution"
      });
      
      return recommendations;
    } catch (error) {
      throw new Error(`Failed to generate recommendations: ${error.message}`);
    }
  }

  // Helper methods for parsing user input
  extractCollateralAsset(input) {
    const solanaRegex = /\b(\d*\.?\d+)\s*SOL\b/i;
    const btcRegex = /\b(\d*\.?\d+)\s*BTC\b/i;
    const ethRegex = /\b(\d*\.?\d+)\s*ETH\b/i;
    const avaxRegex = /\b(\d*\.?\d+)\s*AVAX\b/i;
    
    if (solanaRegex.test(input)) return `${input.match(solanaRegex)[1]} SOL`;
    if (btcRegex.test(input)) return `${input.match(btcRegex)[1]} BTC`;
    if (ethRegex.test(input)) return `${input.match(ethRegex)[1]} ETH`;
    if (avaxRegex.test(input)) return `${input.match(avaxRegex)[1]} AVAX`;
    
    return "1 SOL"; // Default
  }

  extractBorrowAsset(input) {
    const usdcRegex = /\b(\d*\.?\d+)\s*USDC\b/i;
    const daiRegex = /\b(\d*\.?\d+)\s*DAI\b/i;
    
    if (usdcRegex.test(input)) return `${input.match(usdcRegex)[1]} USDC`;
    if (daiRegex.test(input)) return `${input.match(daiRegex)[1]} DAI`;
    
    return "500 USDC"; // Default
  }

  extractAmount(input) {
    const amountRegex = /\b(\d+)\s*(?:USDC|DAI|SOL|BTC|ETH|AVAX)\b/i;
    const match = input.match(amountRegex);
    return match ? match[1] : "500";
  }

  extractLoanTerm(input) {
    const daysRegex = /\b(\d+)\s*days?\b/i;
    const weeksRegex = /\b(\d+)\s*weeks?\b/i;
    const monthsRegex = /\b(\d+)\s*months?\b/i;
    
    if (daysRegex.test(input)) return `${input.match(daysRegex)[1]} days`;
    if (weeksRegex.test(input)) return `${input.match(weeksRegex)[1] * 7} days`;
    if (monthsRegex.test(input)) return `${input.match(monthsRegex)[1] * 30} days`;
    
    return "30 days"; // Default
  }

  extractChainPreference(input) {
    if (/base/i.test(input)) return "Base";
    if (/solana/i.test(input)) return "Solana";
    if (/ethereum/i.test(input)) return "Ethereum";
    if (/avalanche/i.test(input)) return "Avalanche";
    if (/bitcoin/i.test(input)) return "Bitcoin";
    
    return "Base"; // Default
  }

  extractRiskTolerance(input) {
    if (/low/i.test(input)) return "low";
    if (/high/i.test(input)) return "high";
    if (/medium/i.test(input)) return "medium";
    
    return "medium"; // Default
  }
}

module.exports = GeminiService;