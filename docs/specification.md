# GeminiLend X: Feature & Technical Requirements Specification  
*Structured for LLM Parsing – Clear Mapping Between Features, Technical Support, and Requirements*  

## 1. Core Feature Modules & Corresponding Technical Requirements  

### 1.1 Cross-Chain Asset Integration Module  
*(Purpose: Enable seamless multi-chain asset management via ZetaChain, no manual cross-chain transfers)*  

#### 1.1.1 Single-Wallet Multi-Chain Asset View
**Technical Support:**
- ZetaChain Universal Smart Contract (USC)
- ZetaChain Gateway API
- Multi-Wallet Adapter (MetaMask/Phantom)

**Detailed Technical Requirements:**
1. **Contract Deployment**: Deploy USC on ZetaChain Mainnet (Solidity 0.8.19+) to handle asset mapping across Solana/Bitcoin/Base/Avalanche.
2. **API Integration**: Call `zeta_getBalance` endpoint (ZetaChain Gateway API v1.2+) to fetch real-time balances of BTC/SOL/ETH/AVAX in user's connected wallet.
3. **Wallet Compatibility**: Integrate ZetaChain Wallet Adapter v2.0 to support MetaMask (EVM chains) and Phantom (Solana) – auto-detect wallet type and switch chain configurations.
4. **Data Sync**: Sync asset data every 30 seconds (or on wallet transaction confirmation) via WebSocket to avoid stale balances.

#### 1.1.2 Cross-Chain Asset Mapping (Collateral/Repayment)
**Technical Support:**
- ZetaChain Cross-Chain Messaging (CCM)
- USC Asset Locking Logic

**Detailed Technical Requirements:**
1. **Mapping Mechanism**: When user selects an asset (e.g., AVAX on Avalanche) as collateral, USC locks the asset and mints a 1:1 pegged "cross-chain collateral token (cCT)" on ZetaChain Mainnet.
2. **CCM Execution**: Trigger CCM via `zeta_sendCrossChainMessage` to confirm asset locking on the source chain (e.g., Avalanche) and mint cCT on ZetaChain – latency ≤ 15 seconds.
3. **Asset Unmapping**: On repayment, burn cCT via USC and use CCM to unlock/transfer the original asset back to the user's source chain wallet – success rate ≥ 99.5%.

#### 1.1.3 Multi-Chain Asset Health Monitoring
**Technical Support:**
- ZetaChain Public Endpoints
- Real-Time Price Feeds (Chainlink)

**Detailed Technical Requirements:**
1. **Price Integration**: Fetch real-time asset prices (SOL/ETH/AVAX/BTC/USDC) via Chainlink Price Feeds (update frequency ≤ 5 minutes) to calculate collateral value.
2. **Health Factor Calculation**: Compute health factor = (Collateral Value × LTV Ratio) / Borrowed Value – update every 60 seconds.
3. **Alert Trigger**: If health factor < 1.1, send in-app notification via WebSocket and trigger email alert (via SendGrid API) – delay ≤ 10 seconds.

### 1.2 Gemini AI Intelligent Assistance Module  
*(Purpose: Simplify operations and optimize decisions with Google Gemini, target "Best AI Feature" award)*  

#### 1.2.1 Natural Language Lending Request Parsing
**Technical Support:**
- Google Gemini Pro API (v1.5)
- Node.js Backend Service

**Detailed Technical Requirements:**
1. **API Integration**: Call Gemini Pro API with `content: "lending_request"` parameter; set `temperature=0.2` for deterministic parsing.
2. **Request Schema Extraction**: Extract 5 core fields from user input: `collateral_asset` (e.g., "1 SOL"), `borrow_asset` (e.g., "500 USDC"), `loan_term` (e.g., "30 days"), `chain_preference` (e.g., "Base"), `risk_tolerance` (e.g., "low").
3. **Error Handling**: If input is incomplete (e.g., no loan term), Gemini auto-asks follow-up questions (e.g., "How long would you like to borrow for?") – response time ≤ 2 seconds.
4. **Contract Conversion**: Convert parsed schema to USC function call (e.g., `initiateLoan(collateral_asset, borrow_asset, loan_term)`) – accuracy ≥ 98%.

#### 1.2.2 Cross-Chain Credit Score Calculation
**Technical Support:**
- Google Gemini Pro API
- ZetaChain Gateway API (Transaction History)
- PostgreSQL Database

**Detailed Technical Requirements:**
1. **Data Fetching**: Call ZetaChain Gateway API's `zeta_getTransactionHistory` to get user's 6-month cross-chain transaction data (repayments, collateral, defaults).
2. **Score Model**: Gemini uses a weighted model: 40% repayment rate + 30% collateral volatility + 20% social endorsement count + 10% multi-chain activity – score range: 300 (low) → 850 (high).
3. **Score Storage**: Store score and calculation logic in PostgreSQL (encrypted at rest) – update weekly or after major transactions.
4. **Transparency**: Generate a 1-sentence explanation via Gemini (e.g., "Your score is 720 – high repayment rate (40%) and 2 endorsers (20%) boosted your rating").

#### 1.2.3 Dynamic Asset Allocation Recommendations
**Technical Support:**
- Google Gemini Pro API
- CoinGecko API (Market Data)
- React Frontend Visualization

**Detailed Technical Requirements:**
1. **Market Data Input**: Fetch 7-day price trends, gas fees (via `zeta_getGasPrice`), and liquidity pool sizes (via Uniswap V3 Subgraph for Base/Solana) – update every 4 hours.
2. **Recommendation Logic**: Gemini prioritizes: (1) Low gas fee chains for collateral (e.g., "Use Solana (gas: $0.02) instead of Ethereum (gas: $15)"), (2) High-liquidity pools for borrowing (e.g., "Borrow USDC on Base (liquidity: $5M) for faster matching").
3. **Visualization**: Display recommendations as a bar chart (React Chart.js) with "Savings Estimate" (e.g., "Save $12 in gas over 30 days") – load time ≤ 1.5 seconds.

### 1.3 Social Lending Module  
*(Purpose: Reduce interest rates via social trust, differentiate from traditional lending)*  

#### 1.3.1 Social Endorsement Smart Contract
**Technical Support:**
- ZetaChain USC (Custom Extension)
- ECDSA Signature Verification

**Detailed Technical Requirements:**
1. **Endorsement Logic**: Deploy an extension to USC: `endorseLoan(borrowerAddress, endorsementPercentage)` – endorsement percentage (10%-30%) set by endorser.
2. **Signature Requirement**: Endorser must sign the endorsement request with their wallet (ECDSA signature) – verified via `zeta_verifySignature` before storing on-chain.
3. **Risk Sharing**: If borrower defaults, USC automatically deducts the endorsed percentage from the endorser's stZETA balance (locked in a dedicated pool) – execution within 5 minutes of default.

#### 1.3.2 Endorser Fee Distribution
**Technical Support:**
- ZetaChain USC (Fee Logic)
- stZETA Token Integration

**Detailed Technical Requirements:**
1. **Fee Calculation**: Platform charges 0.5% of the loan amount as a fee; 30% of this fee is distributed to endorsers (proportional to their endorsement percentage).
2. **Auto-Distribution**: USC triggers `distributeEndorserFees()` on loan repayment – stZETA transferred to endorser's ZetaChain address within 10 seconds.
3. **Fee Tracking**: Log all fee transactions in PostgreSQL with `loanId`, `endorserAddress`, `amount` – audit trail for transparency.

#### 1.3.3 Vertical Lending Circles
**Technical Support:**
- React Frontend (Circle UI)
- PostgreSQL (Circle Membership)
- WebSocket (Circle Notifications)

**Detailed Technical Requirements:**
1. **Circle Creation**: Users can create circles with: `circleName` (e.g., "BTC Holders"), `assetRequirement` (e.g., "≥ 0.01 BTC"), `membershipApproval` (auto/manual).
2. **Membership Verification**: Check user's asset balance via ZetaChain Gateway API before approving membership – auto-approval takes ≤ 3 seconds.
3. **Circle Benefits**: Circles have dedicated liquidity pools (5% lower fees); members get priority matching (loan fulfillment time ≤ 2 minutes vs. 5 minutes for non-members).
4. **Notifications**: Send WebSocket alerts to circle members for new loan requests/repayments – delivery time ≤ 2 seconds.

### 1.4 Cross-Chain Lending Execution Module  
*(Purpose: Ensure secure, seamless cross-chain loan initiation/repayment/liquidation)*  

#### 1.4.1 Loan Initiation & Fund Disbursement
**Technical Support:**
- ZetaChain CCM
- USC Loan Logic
- Stablecoin Bridge (USDC)

**Detailed Technical Requirements:**
1. **Loan Approval**: USC checks collateral value (via Chainlink Price Feeds) and credit score (from PostgreSQL) – approval time ≤ 3 seconds.
2. **Fund Sourcing**: Pull funds from the platform's cross-chain liquidity pool (e.g., USDC on Base) – pool size ≥ $100k for each supported chain.
3. **Cross-Chain Disbursement**: Use CCM to transfer borrowed assets (e.g., USDC on Base) to the user's target chain wallet – latency ≤ 20 seconds, success rate ≥ 99.7%.

#### 1.4.2 Flexible Multi-Chain Repayment
**Technical Support:**
- USC Repayment Logic
- ZetaChain Asset Conversion

**Detailed Technical Requirements:**
1. **Repayment Asset Flexibility**: Allow users to repay with any supported asset (e.g., repay USDC loan with SOL on Solana).
2. **Auto-Conversion**: USC uses ZetaChain's asset conversion service to swap the repayment asset to the borrowed asset (e.g., SOL → USDC) – conversion rate = real-time market rate + 0.2% fee.
3. **Partial Repayment**: Support partial repayments (minimum 10% of the remaining principal) – USC updates the loan balance and interest calculation in real time.

#### 1.4.3 Automated Cross-Chain Liquidation
**Technical Support:**
- USC Liquidation Logic
- ZetaChain CCM
- Chainlink Automation

**Detailed Technical Requirements:**
1. **Liquidation Trigger**: Chainlink Automation monitors health factor; if < 1.0, it calls USC's `triggerLiquidation(loanId)` – trigger delay ≤ 2 minutes.
2. **Collateral Liquidation**: USC sells the collateral (via Uniswap V3 on the collateral's chain) for the borrowed asset – slippage ≤ 2%.
3. **Cross-Chain Settlement**: Use CCM to transfer the liquidated funds to the lender's chain wallet – settlement time ≤ 30 seconds.
4. **剩余资产返还**: If liquidated funds exceed the owed amount, return the surplus to the borrower's wallet via CCM – surplus returned within 1 minute.

## 2. Non-Functional Technical Requirements  
*(Ensure scalability, security, and user experience – critical for hackathon judging)*  

### 2.1 Performance Requirements  
| Metric | Requirement | Technical Solution |
|------------|------------------|------------------------|
| Frontend Load Time | Initial page load ≤ 2 seconds; subsequent loads ≤ 1 second | - React.lazy() for code splitting<br>- CDN (Cloudflare) for static assets (CSS/JS/Images)<br>- Asset compression (gzip/Brotli) |
| API Response Time | All API calls (Gemini/ZetaChain) ≤ 3 seconds | - Backend caching (Redis) for frequent requests (e.g., asset prices)<br>- API request batching (e.g., fetch balance + credit score in 1 call)<br>- Edge computing (Vercel Edge Functions) to reduce latency |
| Transaction Confirmation | Cross-chain transactions (CCM) ≤ 30 seconds | - Use ZetaChain's Fast Finality feature (confirmation in 1 block)<br>- In-app transaction status tracker (real-time via WebSocket) |

### 2.2 Security Requirements  
| Security Aspect | Requirement | Technical Solution |
|----------------------|------------------|------------------------|
| Smart Contract Security | No critical/high vulnerabilities (per OpenZeppelin Audit Standards) | - Formal verification (Mythril/Slither) for USC<br>- Timelock for critical functions (e.g., liquidation logic) – 24-hour delay<br>- Emergency pause function (only callable by multisig wallet) |
| User Data Security | All user data (wallet/transaction) encrypted | - PostgreSQL data encryption (AES-256-GCM) at rest<br>- TLS 1.3 for all data in transit (frontend ↔ backend ↔ APIs)<br>- No storage of private keys (wallet connections via MetaMask/Phantom SDK) |
| AI API Security | Gemini API key protection | - Backend-only API key storage (environment variables, not frontend)<br>- API key rotation (monthly) – automated via GitHub Actions<br>- Request rate limiting (10 requests/minute per user) to prevent abuse |

### 2.3 Compatibility Requirements  
| Compatibility Aspect | Requirement | Technical Solution |
|---------------------------|------------------|------------------------|
| Wallet Compatibility | Support MetaMask (v10.25+), Phantom (v2024.3+), ZetaChain Wallet (v1.8+) | - ZetaChain Wallet Adapter v2.0 (unified interface for EVM/Solana wallets)<br>- Wallet detection logic (auto-hide unsupported wallets) |
| Device Compatibility | Responsive design for desktop (Chrome/Firefox/Safari), mobile (iOS/Android) | - CSS Grid/Flexbox for responsive layouts<br>- Mobile-first UI design (critical functions accessible in 1 tap)<br>- Browser compatibility testing (BrowserStack) |
| Chain Compatibility | Full support for ZetaChain Mainnet/Testnet, Solana (Mainnet Beta/Devnet), Base (Mainnet/Goerli), Avalanche (Mainnet/Fuji) | - Dynamic chain configuration (stored in backend, not hardcoded)<br>- Testnet/Mainnet toggle in frontend (for demo purposes) |

## 3. Dependencies & Integration Checklist  
*(For LLM to quickly identify external tools/APIs needed)*  

| Dependency Type | Name & Version | Purpose | Integration Status (for Hackathon) |
|----------------------|--------------------|-------------|----------------------------------------|
| Blockchain Infrastructure | ZetaChain Mainnet/Testnet (v1.0+) | Cross-chain asset management, CCM | Completed (contract deployment on Testnet) |
| AI Service | Google Gemini Pro API (v1.5) | NLP parsing, credit scoring, recommendations | Completed (API key obtained, backend integration tested) |
| Price Feeds | Chainlink Price Feeds (v3.0+) | Real-time asset pricing | Completed (API integration, test data validated) |
| Wallet Integration | ZetaChain Wallet Adapter (v2.0), MetaMask SDK (v0.10.0), Phantom SDK (v2.5.0) | Wallet connection, signature verification | Completed (multi-wallet support tested on Testnet) |
| Market Data | CoinGecko API (v3) | Gas fees, liquidity pool data | Completed (API calls integrated, data displayed in frontend) |
| Notification Service | SendGrid API (v3) | Email alerts for low health factor | In Progress (API key obtained, test emails sent) |
| Database | PostgreSQL (v16), Redis (v7.2) | Data storage, caching | Completed (database schema designed, caching logic tested) |
| Frontend Libraries | React (v18), React Chart.js (v4.4.8), WebSocket (Socket.io v4.7.2) | UI rendering, data visualization, real-time updates | Completed (core UI components built, WebSocket tested) |