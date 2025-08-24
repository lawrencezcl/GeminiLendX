// Test file for Gemini Service
const GeminiService = require('../services/gemini.service');

describe('GeminiService', () => {
  let geminiService;

  beforeEach(() => {
    geminiService = new GeminiService();
  });

  describe('parseLendingRequest', () => {
    it('should parse natural language lending request', async () => {
      const userInput = 'I want to borrow 500 USDC for 30 days using 1 SOL as collateral';
      const result = await geminiService.parseLendingRequest(userInput);
      
      expect(result).toHaveProperty('collateral_asset');
      expect(result).toHaveProperty('borrow_asset');
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('loan_term');
      expect(result).toHaveProperty('chain_preference');
      expect(result).toHaveProperty('risk_tolerance');
    });
  });

  describe('calculateCreditScore', () => {
    it('should calculate credit score based on user data', async () => {
      const userData = {
        repaymentRate: 0.95,
        collateralVolatility: 0.1,
        endorsements: 3,
        chainsUsed: 4
      };
      
      const result = await geminiService.calculateCreditScore(userData);
      
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('explanation');
      expect(typeof result.score).toBe('number');
      expect(result.score).toBeGreaterThanOrEqual(300);
      expect(result.score).toBeLessThanOrEqual(850);
    });
  });

  describe('generateRecommendations', () => {
    it('should generate asset allocation recommendations', async () => {
      const marketData = {
        gasFees: {
          solana: 0.02,
          ethereum: 15.50,
          base: 2.25
        },
        liquidity: {
          solana: 2500000,
          ethereum: 15000000,
          base: 8000000
        }
      };
      
      const recommendations = await geminiService.generateRecommendations(marketData);
      
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
    });
  });

  // Helper method tests
  describe('Helper Methods', () => {
    it('should extract collateral asset from input', () => {
      const input = 'I want to borrow 500 USDC using 1.5 SOL as collateral';
      const result = geminiService.extractCollateralAsset(input);
      expect(result).toBe('1.5 SOL');
    });

    it('should extract borrow asset from input', () => {
      const input = 'I want to borrow 500 USDC for 30 days';
      const result = geminiService.extractBorrowAsset(input);
      expect(result).toBe('500 USDC');
    });

    it('should extract loan term from input', () => {
      const input = 'I want to borrow for 30 days';
      const result = geminiService.extractLoanTerm(input);
      expect(result).toBe('30 days');
    });

    it('should extract chain preference from input', () => {
      const input = 'I prefer to use Base chain';
      const result = geminiService.extractChainPreference(input);
      expect(result).toBe('Base');
    });

    it('should extract risk tolerance from input', () => {
      const input = 'I have low risk tolerance';
      const result = geminiService.extractRiskTolerance(input);
      expect(result).toBe('low');
    });
  });
});