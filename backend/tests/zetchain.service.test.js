// Test file for ZetaChain Service
const ZetaChainService = require('../services/zetchain.service');

describe('ZetaChainService', () => {
  let zetaService;

  beforeEach(() => {
    zetaService = new ZetaChainService();
  });

  describe('getBalances', () => {
    it('should return asset balances for a user address', async () => {
      const userAddress = '0x123456789abcdef';
      const balances = await zetaService.getBalances(userAddress);
      
      expect(balances).toHaveProperty('bitcoin');
      expect(balances).toHaveProperty('solana');
      expect(balances).toHaveProperty('ethereum');
      expect(balances).toHaveProperty('avalanche');
      expect(balances).toHaveProperty('base');
    });
  });

  describe('sendCrossChainMessage', () => {
    it('should send a cross-chain message', async () => {
      const result = await zetaService.sendCrossChainMessage(
        'solana',
        'ethereum',
        'test_action',
        { test: 'data' }
      );
      
      expect(result).toHaveProperty('transactionId');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('verifySignature', () => {
    it('should verify a signature', async () => {
      const isValid = await zetaService.verifySignature(
        '0xsigner',
        'test message',
        'signature'
      );
      
      expect(typeof isValid).toBe('boolean');
    });
  });
});