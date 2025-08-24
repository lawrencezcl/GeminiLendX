// Dashboard component for GeminiLend X
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ assets }) {
  const [user, setUser] = useState({
    walletAddress: '0x1234...5678',
    creditScore: 720,
    totalCollateral: 15000,
    totalBorrowed: 5000,
    healthFactor: 2.4
  });
  
  const [loans, setLoans] = useState([
    {
      id: 'loan_001',
      collateral: '1.5 SOL',
      borrowed: '500 USDC',
      term: '30 days',
      status: 'active',
      interestRate: '5.5%',
      healthFactor: 2.1
    },
    {
      id: 'loan_002',
      collateral: '0.2 BTC',
      borrowed: '4000 USDC',
      term: '60 days',
      status: 'repaid',
      interestRate: '6.0%',
      healthFactor: 0
    }
  ]);
  
  const [healthMetrics, setHealthMetrics] = useState({
    totalValue: 15000,
    healthScore: 'excellent',
    assets: [
      { name: 'Bitcoin', amount: 0.5, value: 27500, change: 2.5 },
      { name: 'Solana', amount: 10.25, value: 1281.25, change: -1.2 },
      { name: 'Ethereum', amount: 2.75, value: 7702.06, change: 0.8 },
      { name: 'Avalanche', amount: 15.5, value: 1166.38, change: 3.1 },
      { name: 'Base', amount: 1250.75, value: 1250.75, change: 0.0 }
    ]
  });

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* User Summary Card */}
        <div className="card user-summary">
          <h2>Portfolio Overview</h2>
          <div className="user-info">
            <p><strong>Wallet:</strong> {user.walletAddress}</p>
            <p><strong>Credit Score:</strong> <span className="score">{user.creditScore}</span></p>
            <p><strong>Total Collateral:</strong> ${user.totalCollateral.toLocaleString()}</p>
            <p><strong>Total Borrowed:</strong> ${user.totalBorrowed.toLocaleString()}</p>
            <p><strong>Health Factor:</strong> <span className={user.healthFactor > 1.5 ? 'healthy' : 'warning'}>{user.healthFactor}</span></p>
          </div>
        </div>
        
        {/* Health Metrics Card */}
        <div className="card health-metrics">
          <h2>Asset Health</h2>
          <div className="health-info">
            <p><strong>Total Value:</strong> ${healthMetrics.totalValue.toLocaleString()}</p>
            <p><strong>Health Score:</strong> <span className={`health-score ${healthMetrics.healthScore}`}>{healthMetrics.healthScore}</span></p>
          </div>
          <div className="assets-list">
            <h3>Assets Breakdown</h3>
            {healthMetrics.assets.map((asset, index) => (
              <div key={index} className="asset-item">
                <span className="asset-name">{asset.name}</span>
                <span className="asset-amount">{asset.amount}</span>
                <span className="asset-value">${asset.value.toLocaleString()}</span>
                <span className={`asset-change ${asset.change >= 0 ? 'positive' : 'negative'}`}>
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Loans Section */}
        <div className="card loans-section">
          <h2>Your Loans</h2>
          <div className="loans-list">
            {loans.map(loan => (
              <div key={loan.id} className={`loan-item status-${loan.status}`}>
                <div className="loan-header">
                  <span className="loan-id">#{loan.id}</span>
                  <span className={`status ${loan.status}`}>{loan.status}</span>
                </div>
                <div className="loan-details">
                  <p><strong>Collateral:</strong> {loan.collateral}</p>
                  <p><strong>Borrowed:</strong> {loan.borrowed}</p>
                  <p><strong>Term:</strong> {loan.term}</p>
                  <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                  {loan.status === 'active' && (
                    <p><strong>Health Factor:</strong> <span className={loan.healthFactor > 1.5 ? 'healthy' : 'warning'}>{loan.healthFactor}</span></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Recommendations Card */}
        <div className="card ai-recommendations">
          <h2>AI Recommendations</h2>
          <div className="recommendations-list">
            <div className="recommendation-item">
              <h3>Gas Optimization</h3>
              <p>Use Solana for next collateral (save ~$15 per transaction)</p>
            </div>
            <div className="recommendation-item">
              <h3>Liquidity</h3>
              <p>Base chain has highest USDC liquidity ($8M)</p>
            </div>
            <div className="recommendation-item">
              <h3>Risk Management</h3>
              <p>Maintain health factor above 1.5 for safety</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;