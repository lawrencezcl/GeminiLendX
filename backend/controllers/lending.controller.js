// Lending Controller for Cross-Chain Lending Execution Module
const Loan = require('../models/Loan');
const ZetaChainService = require('../services/zetchain.service');
const PriceService = require('../services/price.service');

class LendingController {
  constructor() {
    this.zetaService = new ZetaChainService();
    this.priceService = new PriceService();
  }

  /**
   * Initiate a new loan
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async initiateLoan(req, res) {
    try {
      const { borrowerId, collateralAsset, borrowAsset, amount, term } = req.body;
      
      // Validate input
      if (!borrowerId || !collateralAsset || !borrowAsset || !amount || !term) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: borrowerId, collateralAsset, borrowAsset, amount, term'
        });
      }
      
      // Check collateral value using Chainlink Price Feeds
      const prices = await this.priceService.getChainlinkPrices([collateralAsset]);
      const collateralValue = prices[collateralAsset] * amount; // Simplified calculation
      
      // Create loan record
      const loan = new Loan(
        Date.now().toString(),
        borrowerId,
        collateralAsset,
        borrowAsset,
        amount,
        term,
        5.5 // 5.5% annual interest rate
      );
      
      // Approve loan based on collateral value
      if (collateralValue > amount * 1.2) { // Simple LTV check
        loan.status = 'approved';
        
        // Pull funds from liquidity pool and disburse via CCM
        const disbursement = await this.zetaService.sendCrossChainMessage(
          'base', // Assuming USDC pool is on Base
          'user_target_chain',
          'disburse_funds',
          { asset: borrowAsset, amount, userAddress: borrowerId }
        );
        
        res.json({
          success: true,
          data: {
            loan: await loan.getLoanDetails(),
            disbursement
          },
          message: 'Loan initiated and funds disbursed successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Insufficient collateral value'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Process loan repayment
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async repayLoan(req, res) {
    try {
      const { loanId, repaymentAsset, amount } = req.body;
      
      // Validate input
      if (!loanId || !repaymentAsset || !amount) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: loanId, repaymentAsset, amount'
        });
      }
      
      // In a real implementation, we would fetch the actual loan from database
      // For now, we'll simulate the process
      const loan = new Loan(
        loanId,
        'borrower_123',
        'SOL',
        'USDC',
        1000,
        30,
        5.5
      );
      
      // Auto-convert repayment asset to borrowed asset if needed
      if (repaymentAsset !== 'USDC') {
        // Conversion logic would go here
        console.log(`Converting ${amount} ${repaymentAsset} to USDC`);
      }
      
      // Process repayment
      const result = await loan.processRepayment(amount, repaymentAsset);
      
      // If repayment is successful, unmapping of collateral
      if (result.success) {
        const unmapping = await this.zetaService.sendCrossChainMessage(
          'zetachain',
          'solana', // Assuming collateral was on Solana
          'burn_and_unlock',
          { asset: 'SOL', amount: 1.5, userAddress: 'borrower_123' }
        );
        
        res.json({
          success: true,
          data: {
            repayment: result,
            unmapping: unmapping
          },
          message: 'Loan repaid and collateral unmapped successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Loan repayment failed'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Trigger liquidation for under-collateralized loan
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async liquidateLoan(req, res) {
    try {
      const { loanId } = req.body;
      
      // Validate input
      if (!loanId) {
        return res.status(400).json({
          success: false,
          error: 'Missing required field: loanId'
        });
      }
      
      // In a real implementation, we would fetch the actual loan from database
      // For now, we'll simulate the process
      const loan = new Loan(
        loanId,
        'borrower_123',
        'SOL',
        'USDC',
        1000,
        30,
        5.5
      );
      loan.status = 'active';
      
      // Sell collateral via Uniswap V3
      console.log(`Selling collateral for loan ${loanId}`);
      
      // Transfer liquidated funds to lender via CCM
      const settlement = await this.zetaService.sendCrossChainMessage(
        'solana', // Assuming collateral was on Solana
        'lender_chain',
        'settle_liquidation',
        { loanId, amount: 950 } // 95% recovery rate
      );
      
      // Process liquidation
      const result = await loan.triggerLiquidation();
      
      res.json({
        success: true,
        data: {
          liquidation: result,
          settlement: settlement
        },
        message: 'Loan liquidated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get loan details
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  async getLoanDetails(req, res) {
    try {
      const { loanId } = req.params;
      
      // Validate input
      if (!loanId) {
        return res.status(400).json({
          success: false,
          error: 'Missing required parameter: loanId'
        });
      }
      
      // In a real implementation, we would fetch the actual loan from database
      // For now, we'll simulate the process
      const loan = new Loan(
        loanId,
        'borrower_123',
        'SOL',
        'USDC',
        1000,
        30,
        5.5
      );
      
      const details = await loan.getLoanDetails();
      
      res.json({
        success: true,
        data: details
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = LendingController;