// Loan model for managing lending operations
const PriceService = require('../services/price.service');

class Loan {
  constructor(id, borrowerId, collateralAsset, borrowAsset, amount, term, interestRate) {
    this.id = id;
    this.borrowerId = borrowerId;
    this.collateralAsset = collateralAsset;
    this.borrowAsset = borrowAsset;
    this.amount = amount;
    this.term = term; // in days
    this.interestRate = interestRate; // annual percentage rate
    this.status = 'pending'; // pending, approved, active, repaid, defaulted, liquidated
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.priceService = new PriceService();
  }

  // Calculate health factor
  async calculateHealthFactor(collateralValue) {
    // Health factor = (Collateral Value × LTV Ratio) / Borrowed Value
    const ltvRatio = 0.8; // 80% Loan-to-Value ratio
    const borrowedValue = this.amount;
    return (collateralValue * ltvRatio) / borrowedValue;
  }

  // Update loan status
  async updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
    return this;
  }

  // Process repayment
  async processRepayment(amount, asset) {
    try {
      // In a real implementation, this would interact with smart contracts
      // For now, we simulate the process
      
      // Validate repayment amount
      if (amount <= 0) {
        throw new Error('Repayment amount must be greater than 0');
      }
      
      // Update loan status
      await this.updateStatus('repaid');
      
      return { 
        success: true, 
        remainingBalance: Math.max(0, this.amount - amount),
        message: 'Loan repaid successfully'
      };
    } catch (error) {
      throw new Error(`Failed to process repayment: ${error.message}`);
    }
  }

  // Trigger liquidation
  async triggerLiquidation() {
    try {
      // In a real implementation, this would interact with smart contracts
      // For now, we simulate the process
      
      // Update loan status
      await this.updateStatus('liquidated');
      
      return { 
        success: true, 
        amountRecovered: this.amount * 0.95, // 95% recovery rate
        message: 'Loan liquidated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to trigger liquidation: ${error.message}`);
    }
  }

  // Calculate interest
  calculateInterest() {
    // Simple interest calculation: Principal × Rate × Time
    const timeInYears = this.term / 365;
    return this.amount * (this.interestRate / 100) * timeInYears;
  }

  // Get loan details with calculated values
  async getLoanDetails() {
    const interest = this.calculateInterest();
    const totalRepayment = this.amount + interest;
    
    // Get current health factor
    const healthFactor = await this.calculateHealthFactor(this.amount * 1.5); // Sample collateral value
    
    return {
      id: this.id,
      borrowerId: this.borrowerId,
      collateralAsset: this.collateralAsset,
      borrowAsset: this.borrowAsset,
      principal: this.amount,
      term: this.term,
      interestRate: this.interestRate,
      interest: interest,
      totalRepayment: totalRepayment,
      status: this.status,
      healthFactor: healthFactor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Loan;