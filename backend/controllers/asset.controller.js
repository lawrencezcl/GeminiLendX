// Asset Controller for Cross-Chain Asset Integration Module
const ZetaChainService = require('../services/zetchain.service');
const PriceService = require('../services/price.service');

class AssetController {
  constructor() {
    this.zetaService = new ZetaChainService();
    this.priceService = new PriceService();
  }

  /**
   * Get user's cross-chain asset view
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async getAssetView(req, res) {
    try {
      const { userAddress } = req.params;
      const balances = await this.zetaService.getBalances(userAddress);
      
      // Calculate total value in USD
      const assets = Object.keys(balances);
      const prices = await this.priceService.getChainlinkPrices(assets);
      
      let totalValue = 0;
      const assetValues = {};
      
      assets.forEach(asset => {
        const value = balances[asset] * (prices[asset] || 0);
        assetValues[asset] = {
          amount: balances[asset],
          price: prices[asset] || 0,
          value: value
        };
        totalValue += value;
      });
      
      res.json({
        success: true,
        data: {
          balances: assetValues,
          totalValue: totalValue,
          lastUpdated: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Map asset for collateral
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async mapAsset(req, res) {
    try {
      const { sourceChain, asset, amount, userAddress } = req.body;
      
      // Validate input
      if (!sourceChain || !asset || !amount || !userAddress) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: sourceChain, asset, amount, userAddress'
        });
      }
      
      // Lock asset on source chain and mint cCT on ZetaChain
      const result = await this.zetaService.sendCrossChainMessage(
        sourceChain, 
        'zetachain', 
        'lock_and_mint', 
        { asset, amount, userAddress }
      );
      
      res.json({
        success: true,
        data: result,
        message: 'Asset mapped successfully for collateral'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Unmap asset after repayment
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async unmapAsset(req, res) {
    try {
      const { targetChain, asset, amount, userAddress } = req.body;
      
      // Validate input
      if (!targetChain || !asset || !amount || !userAddress) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: targetChain, asset, amount, userAddress'
        });
      }
      
      // Burn cCT on ZetaChain and unlock asset on target chain
      const result = await this.zetaService.sendCrossChainMessage(
        'zetachain',
        targetChain,
        'burn_and_unlock',
        { asset, amount, userAddress }
      );
      
      res.json({
        success: true,
        data: result,
        message: 'Asset unmapped successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Monitor asset health
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async monitorAssetHealth(req, res) {
    try {
      const { userAddress } = req.params;
      
      // Get user's asset balances
      const balances = await this.zetaService.getBalances(userAddress);
      
      // Get current prices
      const assets = Object.keys(balances);
      const prices = await this.priceService.getChainlinkPrices(assets);
      
      // Calculate health metrics
      let totalValue = 0;
      const assetMetrics = {};
      
      assets.forEach(asset => {
        const value = balances[asset] * (prices[asset] || 0);
        assetMetrics[asset] = {
          amount: balances[asset],
          price: prices[asset] || 0,
          value: value,
          change24h: 0 // Would be calculated from price history
        };
        totalValue += value;
      });
      
      // Calculate overall health score (simplified)
      const healthScore = totalValue > 10000 ? 'excellent' : 
                         totalValue > 5000 ? 'good' : 
                         totalValue > 1000 ? 'fair' : 'poor';
      
      res.json({
        success: true,
        data: {
          totalValue: totalValue,
          healthScore: healthScore,
          assets: assetMetrics,
          lastUpdated: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = AssetController;