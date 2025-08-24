// User model for storing user information
const ZetaChainService = require('../services/zetchain.service');

class User {
  constructor(id, walletAddress, email) {
    this.id = id;
    this.walletAddress = walletAddress;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.zetaService = new ZetaChainService();
  }

  // Get user's cross-chain asset balances
  async getAssetBalances() {
    try {
      const balances = await this.zetaService.getBalances(this.walletAddress);
      return balances;
    } catch (error) {
      throw new Error(`Failed to fetch asset balances: ${error.message}`);
    }
  }

  // Get user's credit score
  async getCreditScore() {
    // In a real implementation, this would fetch from the database
    // For now, we return a sample score
    return {
      score: 720,
      lastUpdated: new Date().toISOString()
    };
  }

  // Get user's transaction history
  async getTransactionHistory(limit = 50) {
    try {
      const history = await this.zetaService.getTransactionHistory(this.walletAddress, limit);
      return history;
    } catch (error) {
      throw new Error(`Failed to fetch transaction history: ${error.message}`);
    }
  }

  // Update user's information
  async update(data) {
    // Implementation to update user information
    if (data.email) this.email = data.email;
    this.updatedAt = new Date();
    return this;
  }

  // Calculate user's total asset value
  async getTotalAssetValue() {
    try {
      const balances = await this.getAssetBalances();
      // In a real implementation, we would convert all assets to USD
      // For now, we return a sample value
      const totalValue = Object.values(balances).reduce((sum, balance) => sum + balance, 0);
      return totalValue;
    } catch (error) {
      throw new Error(`Failed to calculate total asset value: ${error.message}`);
    }
  }
}

module.exports = User;