// Price Service for fetching real-time asset prices
const axios = require('axios');

class PriceService {
  constructor() {
    // Initialize service with API keys
    this.chainlinkBaseUrl = process.env.CHAINLINK_API_URL || 'https://api.chain.link';
    this.coingeckoApiKey = process.env.COINGECKO_API_KEY;
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Fetch real-time asset prices via Chainlink
   * @param {Array<string>} assets - List of assets to fetch prices for
   * @returns {Promise<Object>} Asset prices
   */
  async getChainlinkPrices(assets) {
    // Implementation for fetching Chainlink Price Feeds
    try {
      // In a real implementation, this would call the actual Chainlink API
      // For now, we return sample data
      const prices = {};
      
      // Sample prices (in USD)
      const samplePrices = {
        'SOL': 125.50,
        'BTC': 55000.00,
        'ETH': 2800.75,
        'AVAX': 75.25,
        'USDC': 1.00,
        'DAI': 1.00
      };
      
      assets.forEach(asset => {
        prices[asset] = samplePrices[asset] || 0;
      });
      
      return prices;
    } catch (error) {
      throw new Error(`Failed to fetch Chainlink prices: ${error.message}`);
    }
  }

  /**
   * Fetch market data via CoinGecko
   * @param {Array<string>} chains - List of chains to fetch data for
   * @returns {Promise<Object>} Market data
   */
  async getCoingeckoData(chains) {
    // Implementation for fetching CoinGecko API data
    try {
      // In a real implementation, this would call the actual CoinGecko API
      // For now, we return sample data
      const marketData = {};
      
      // Sample market data
      const sampleData = {
        'solana': {
          gas_fee: 0.02,
          liquidity: 2500000 // $2.5M
        },
        'ethereum': {
          gas_fee: 15.50,
          liquidity: 15000000 // $15M
        },
        'base': {
          gas_fee: 2.25,
          liquidity: 8000000 // $8M
        },
        'avalanche': {
          gas_fee: 3.75,
          liquidity: 3500000 // $3.5M
        }
      };
      
      chains.forEach(chain => {
        marketData[chain] = sampleData[chain] || {
          gas_fee: 0,
          liquidity: 0
        };
      });
      
      return marketData;
    } catch (error) {
      throw new Error(`Failed to fetch CoinGecko data: ${error.message}`);
    }
  }

  /**
   * Calculate health factor for a loan
   * @param {number} collateralValue - Value of collateral in USD
   * @param {number} borrowedValue - Value of borrowed assets in USD
   * @param {number} ltvRatio - Loan-to-Value ratio (e.g., 0.8 for 80%)
   * @returns {number} Health factor
   */
  calculateHealthFactor(collateralValue, borrowedValue, ltvRatio = 0.8) {
    if (borrowedValue <= 0) return Infinity;
    return (collateralValue * ltvRatio) / borrowedValue;
  }

  /**
   * Get 7-day price trends for assets
   * @param {Array<string>} assets - List of assets to fetch trends for
   * @returns {Promise<Object>} Price trends
   */
  async getPriceTrends(assets) {
    try {
      // In a real implementation, this would call the actual API
      // For now, we return sample data
      const trends = {};
      
      assets.forEach(asset => {
        // Generate a random trend between -10% and +10%
        const trend = (Math.random() * 20 - 10) / 100;
        trends[asset] = trend;
      });
      
      return trends;
    } catch (error) {
      throw new Error(`Failed to fetch price trends: ${error.message}`);
    }
  }
}

module.exports = PriceService;