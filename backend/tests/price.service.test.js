// Test file for Price Service
const PriceService = require('../services/price.service');

describe('PriceService', () => {
  let priceService;

  beforeEach(() => {
    priceService = new PriceService();
  });

  describe('getChainlinkPrices', () => {
    it('should return prices for specified assets', async () => {
      const assets = ['SOL', 'BTC', 'ETH'];
      const prices = await priceService.getChainlinkPrices(assets);
      
      expect(prices).toHaveProperty('SOL');
      expect(prices).toHaveProperty('BTC');
      expect(prices).toHaveProperty('ETH');
      expect(typeof prices.SOL).toBe('number');
    });
  });

  describe('getCoingeckoData', () => {
    it('should return market data for specified chains', async () => {
      const chains = ['solana', 'ethereum', 'base'];
      const marketData = await priceService.getCoingeckoData(chains);
      
      chains.forEach(chain => {
        expect(marketData).toHaveProperty(chain);
        expect(marketData[chain]).toHaveProperty('gas_fee');
        expect(marketData[chain]).toHaveProperty('liquidity');
      });
    });
  });

  describe('calculateHealthFactor', () => {
    it('should calculate health factor correctly', () => {
      const collateralValue = 10000;
      const borrowedValue = 5000;
      const ltvRatio = 0.8;
      
      const healthFactor = priceService.calculateHealthFactor(collateralValue, borrowedValue, ltvRatio);
      const expected = (collateralValue * ltvRatio) / borrowedValue;
      
      expect(healthFactor).toBe(expected);
    });

    it('should return Infinity for zero borrowed value', () => {
      const healthFactor = priceService.calculateHealthFactor(10000, 0);
      expect(healthFactor).toBe(Infinity);
    });
  });

  describe('getPriceTrends', () => {
    it('should return price trends for specified assets', async () => {
      const assets = ['SOL', 'BTC'];
      const trends = await priceService.getPriceTrends(assets);
      
      assets.forEach(asset => {
        expect(trends).toHaveProperty(asset);
        expect(typeof trends[asset]).toBe('number');
      });
    });
  });
});