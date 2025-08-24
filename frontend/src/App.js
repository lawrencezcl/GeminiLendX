// Main App component for GeminiLend X frontend
import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import LendingRequestForm from './components/LendingRequestForm';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [assets, setAssets] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulate wallet connection
  const connectWallet = async () => {
    setLoading(true);
    // In a real implementation, this would connect to MetaMask, Phantom, etc.
    setTimeout(() => {
      setWalletConnected(true);
      setUserAddress('0x1234...5678'); // Placeholder address
      setAssets({
        bitcoin: { amount: 0.5, value: 27500 },
        solana: { amount: 10.25, value: 1281.25 },
        ethereum: { amount: 2.75, value: 7702.06 },
        avalanche: { amount: 15.5, value: 1166.38 },
        base: { amount: 1250.75, value: 1250.75 }
      });
      setLoading(false);
    }, 1000);
  };

  // Simulate wallet disconnection
  const disconnectWallet = () => {
    setWalletConnected(false);
    setUserAddress('');
    setAssets({});
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>GeminiLend X</h1>
          <p>Cross-Chain Lending Platform with AI-Powered Assistance</p>
          
          <div className="wallet-section">
            {!walletConnected ? (
              <button onClick={connectWallet} disabled={loading} className="connect-button">
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <div className="wallet-connected">
                <span className="wallet-address">Connected: {userAddress}</span>
                <button onClick={disconnectWallet} className="disconnect-button">Disconnect</button>
              </div>
            )}
          </div>
          
          {walletConnected && (
            <div className="navigation">
              <button 
                className={activeTab === 'dashboard' ? 'nav-button active' : 'nav-button'}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={activeTab === 'lending' ? 'nav-button active' : 'nav-button'}
                onClick={() => setActiveTab('lending')}
              >
                Request Loan
              </button>
              <button 
                className={activeTab === 'recommendations' ? 'nav-button active' : 'nav-button'}
                onClick={() => setActiveTab('recommendations')}
              >
                Recommendations
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="App-main">
        {walletConnected ? (
          <>
            {activeTab === 'dashboard' && <Dashboard assets={assets} />}
            {activeTab === 'lending' && <LendingRequestForm />}
            {activeTab === 'recommendations' && (
              <div className="recommendations-page">
                <h2>AI-Powered Recommendations</h2>
                <div className="recommendations-content">
                  <div className="recommendation-card">
                    <h3>Gas Fee Optimization</h3>
                    <p>Use Solana for collateral (gas fee: $0.02) instead of Ethereum (gas fee: $15.50)</p>
                    <p className="savings">Save $15.48 per transaction</p>
                  </div>
                  <div className="recommendation-card">
                    <h3>Liquidity Pool</h3>
                    <p>Borrow USDC on Base chain (liquidity: $8M) for faster matching</p>
                    <p className="benefit">Higher execution probability</p>
                  </div>
                  <div className="recommendation-card">
                    <h3>Portfolio Diversification</h3>
                    <p>Your portfolio is concentrated in stablecoins. Consider adding BTC exposure.</p>
                    <p className="risk">Risk assessment: Medium</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="welcome-section">
            <h2>Welcome to GeminiLend X</h2>
            <p>Connect your wallet to access cross-chain lending with AI-powered assistance</p>
            <div className="features-preview">
              <div className="feature-card">
                <h3>Cross-Chain Integration</h3>
                <p>Manage assets across Solana, Bitcoin, Base, and Avalanche</p>
              </div>
              <div className="feature-card">
                <h3>AI Assistance</h3>
                <p>Get intelligent recommendations with Google Gemini</p>
              </div>
              <div className="feature-card">
                <h3>Social Lending</h3>
                <p>Reduce interest rates through social endorsements</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;