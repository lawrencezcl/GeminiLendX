// Lending Request Form component
import React, { useState } from 'react';

function LendingRequestForm() {
  const [requestType, setRequestType] = useState('natural'); // 'natural' or 'manual'
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [manualRequest, setManualRequest] = useState({
    collateralAsset: 'SOL',
    collateralAmount: '',
    borrowAsset: 'USDC',
    borrowAmount: '',
    term: '30',
    chain: 'base',
    riskTolerance: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [creditScore, setCreditScore] = useState(720);

  const handleNaturalLanguageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real implementation, this would call the AI parsing API
    setTimeout(() => {
      setResult({
        collateral_asset: '1.5 SOL',
        borrow_asset: '500 USDC',
        loan_term: '30 days',
        chain_preference: 'Base',
        risk_tolerance: 'low',
        estimated_interest: '5.5%',
        health_factor: '2.1'
      });
      setLoading(false);
    }, 1500);
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real implementation, this would call the lending initiation API
    setTimeout(() => {
      setResult({
        loanId: 'loan_12345',
        status: 'approved',
        collateral: `${manualRequest.collateralAmount} ${manualRequest.collateralAsset}`,
        borrowed: `${manualRequest.borrowAmount} ${manualRequest.borrowAsset}`,
        term: `${manualRequest.term} days`,
        interestRate: creditScore > 700 ? '5.5%' : '7.5%',
        healthFactor: creditScore > 700 ? 2.1 : 1.3,
        message: 'Loan approved successfully!'
      });
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualRequest({
      ...manualRequest,
      [name]: value
    });
  };

  return (
    <div className="lending-request-form">
      <h2>Request a Loan</h2>
      
      <div className="credit-score-display">
        <p>Your Credit Score: <span className="score">{creditScore}</span></p>
      </div>
      
      <div className="request-type-toggle">
        <button 
          className={requestType === 'natural' ? 'active' : ''}
          onClick={() => setRequestType('natural')}
        >
          Natural Language Request
        </button>
        <button 
          className={requestType === 'manual' ? 'active' : ''}
          onClick={() => setRequestType('manual')}
        >
          Manual Request
        </button>
      </div>

      {requestType === 'natural' ? (
        <form onSubmit={handleNaturalLanguageSubmit} className="request-form">
          <div className="form-group">
            <label htmlFor="naturalRequest">Describe your lending request:</label>
            <textarea
              id="naturalRequest"
              value={naturalLanguageInput}
              onChange={(e) => setNaturalLanguageInput(e.target.value)}
              placeholder="e.g., I want to borrow 500 USDC for 30 days using 1.5 SOL as collateral on Base chain"
              rows="4"
              required
            />
            <div className="examples">
              <p><strong>Examples:</strong></p>
              <ul>
                <li>"Borrow 1000 USDC for 60 days with 0.5 BTC collateral on Bitcoin chain"</li>
                <li>"Need 2000 DAI for 90 days using 10 AVAX as collateral, low risk tolerance"</li>
              </ul>
            </div>
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Processing...' : 'Parse Request'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleManualSubmit} className="request-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="collateralAsset">Collateral Asset:</label>
              <select
                id="collateralAsset"
                name="collateralAsset"
                value={manualRequest.collateralAsset}
                onChange={handleInputChange}
                required
              >
                <option value="SOL">Solana (SOL)</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="AVAX">Avalanche (AVAX)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="collateralAmount">Amount:</label>
              <input
                type="number"
                id="collateralAmount"
                name="collateralAmount"
                value={manualRequest.collateralAmount}
                onChange={handleInputChange}
                placeholder="e.g., 1.5"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="borrowAsset">Borrow Asset:</label>
              <select
                id="borrowAsset"
                name="borrowAsset"
                value={manualRequest.borrowAsset}
                onChange={handleInputChange}
                required
              >
                <option value="USDC">USD Coin (USDC)</option>
                <option value="DAI">Dai (DAI)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="borrowAmount">Amount:</label>
              <input
                type="number"
                id="borrowAmount"
                name="borrowAmount"
                value={manualRequest.borrowAmount}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="term">Loan Term (days):</label>
              <select
                id="term"
                name="term"
                value={manualRequest.term}
                onChange={handleInputChange}
                required
              >
                <option value="7">7 days</option>
                <option value="15">15 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="chain">Preferred Chain:</label>
              <select
                id="chain"
                name="chain"
                value={manualRequest.chain}
                onChange={handleInputChange}
                required
              >
                <option value="solana">Solana</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="base">Base</option>
                <option value="avalanche">Avalanche</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="riskTolerance">Risk Tolerance:</label>
            <select
              id="riskTolerance"
              name="riskTolerance"
              value={manualRequest.riskTolerance}
              onChange={handleInputChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Processing...' : 'Request Loan'}
          </button>
        </form>
      )}

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <div className="result-content">
            {requestType === 'natural' ? (
              <>
                <p><strong>Collateral:</strong> {result.collateral_asset}</p>
                <p><strong>Borrow:</strong> {result.borrow_asset}</p>
                <p><strong>Term:</strong> {result.loan_term}</p>
                <p><strong>Chain:</strong> {result.chain_preference}</p>
                <p><strong>Risk Tolerance:</strong> {result.risk_tolerance}</p>
                <p><strong>Estimated Interest:</strong> {result.estimated_interest}</p>
                <p><strong>Health Factor:</strong> <span className={result.health_factor > 1.5 ? 'healthy' : 'warning'}>{result.health_factor}</span></p>
              </>
            ) : (
              <>
                <p><strong>Loan ID:</strong> {result.loanId}</p>
                <p><strong>Status:</strong> <span className="status approved">{result.status}</span></p>
                <p><strong>Collateral:</strong> {result.collateral}</p>
                <p><strong>Borrowed:</strong> {result.borrowed}</p>
                <p><strong>Term:</strong> {result.term}</p>
                <p><strong>Interest Rate:</strong> {result.interestRate}</p>
                <p><strong>Health Factor:</strong> <span className={result.healthFactor > 1.5 ? 'healthy' : 'warning'}>{result.healthFactor}</span></p>
                <p className="success-message">{result.message}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LendingRequestForm;