# GeminiLend X Technical Documentation

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [API Documentation](#api-documentation)
4. [Smart Contracts](#smart-contracts)
5. [Database Schema](#database-schema)
6. [Frontend Components](#frontend-components)
7. [Deployment Guide](#deployment-guide)

## System Architecture

GeminiLend X follows a microservices architecture with the following components:

1. **Frontend Layer**: React-based web application
2. **Backend Layer**: Node.js/Express API services
3. **Blockchain Layer**: ZetaChain smart contracts
4. **AI Layer**: Google Gemini Pro integration
5. **Data Layer**: PostgreSQL database with Redis caching
6. **External Services**: Chainlink, CoinGecko, SendGrid

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Frontend      │    │    Backend       │    │   Blockchain     │
│   (React)       │◄──►│   (Node.js)      │◄──►│   (ZetaChain)    │
└─────────────────┘    └──────────────────┘    └──────────────────┘
                              │                         │
                              ▼                         ▼
                    ┌──────────────────┐    ┌──────────────────┐
                    │  External APIs   │    │   Smart Contracts│
                    │(Gemini,Chainlink)│    │                  │
                    └──────────────────┘    └──────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **State Management**: React Hooks
- **Styling**: CSS3 with modular approach
- **Charts**: Chart.js
- **Wallet Integration**: ZetaChain Wallet Adapter, MetaMask SDK, Phantom SDK

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL 16
- **Caching**: Redis 7.2
- **Testing**: Jest
- **API Documentation**: Swagger/OpenAPI

### Blockchain
- **Platform**: ZetaChain
- **Smart Contracts**: Solidity ^0.8.19
- **Development Tools**: Hardhat, Truffle
- **Testing**: Mocha, Chai

### AI Services
- **Primary AI**: Google Gemini Pro API v1.5
- **Natural Language Processing**: Custom parsing logic
- **Recommendation Engine**: Gemini-powered algorithms

### External Services
- **Price Feeds**: Chainlink Price Feeds v3.0+
- **Market Data**: CoinGecko API v3
- **Notifications**: SendGrid API v3, WebSocket
- **Analytics**: (To be integrated)

## API Documentation

### Asset Management API

#### Get User Asset Balances
```
GET /api/assets/:userAddress
```
**Response:**
```json
{
  "success": true,
  "data": {
    "balances": {
      "bitcoin": 0.5,
      "solana": 10,
      "ethereum": 5,
      "avalanche": 20,
      "base": 1000
    },
    "totalValue": 15000,
    "lastUpdated": "2025-08-24T10:00:00Z"
  }
}
```

#### Map Asset for Collateral
```
POST /api/assets/map
```
**Request Body:**
```json
{
  "sourceChain": "solana",
  "asset": "SOL",
  "amount": 10,
  "userAddress": "0x1234..."
}
```

#### Unmap Asset
```
POST /api/assets/unmap
```
**Request Body:**
```json
{
  "targetChain": "solana",
  "asset": "SOL",
  "amount": 10,
  "userAddress": "0x1234..."
}
```

### Lending API

#### Initiate Loan
```
POST /api/loans/initiate
```
**Request Body:**
```json
{
  "borrowerId": 1,
  "collateralAsset": "SOL",
  "borrowAsset": "USDC",
  "amount": 500,
  "term": 30
}
```

#### Repay Loan
```
POST /api/loans/repay
```
**Request Body:**
```json
{
  "loanId": "loan_12345",
  "repaymentAsset": "SOL",
  "amount": 500
}
```

#### Liquidate Loan
```
POST /api/loans/liquidate
```
**Request Body:**
```json
{
  "loanId": "loan_12345"
}
```

### AI Services API

#### Parse Lending Request
```
POST /api/ai/parse-request
```
**Request Body:**
```json
{
  "userInput": "I want to borrow 500 USDC for 30 days using 1 SOL as collateral"
}
```

#### Get Credit Score
```
GET /api/ai/credit-score/:userId
```

#### Get Recommendations
```
GET /api/ai/recommendations
```

## Smart Contracts

### Universal Smart Contract (USC)
The main smart contract deployed on ZetaChain handles:
- Cross-chain asset management
- Loan initiation and repayment
- Social lending features
- Liquidation mechanisms

**Key Functions:**
- `zeta_getBalance`: Fetch cross-chain balances
- `zeta_sendCrossChainMessage`: Handle cross-chain operations
- `zeta_verifySignature`: Verify ECDSA signatures
- `endorseLoan`: Handle social endorsements
- `distributeEndorserFees`: Distribute fees to endorsers
- `triggerLiquidation`: Handle loan liquidations

## Database Schema

The PostgreSQL database contains the following tables:

1. **users**: User information and wallet addresses
2. **loans**: Loan records and status
3. **endorsements**: Social lending endorsements
4. **credit_scores**: User credit scores and history
5. **lending_circles**: Social lending circles
6. **circle_memberships**: Circle membership records
7. **fee_distributions**: Endorser fee records

Refer to [schema.sql](../database/schema.sql) for detailed schema definition.

## Frontend Components

### Main Components

1. **App.js**: Main application component
2. **Dashboard.js**: User dashboard with asset overview
3. **LendingRequestForm.js**: Form for requesting loans
4. **AssetViewer.js**: Component to display cross-chain assets
5. **LoanManager.js**: Component to manage loans
6. **Recommendations.js**: Component to display AI recommendations

### State Management
The frontend uses React Hooks for state management:
- `useState` for local component state
- `useEffect` for side effects
- Custom hooks for complex logic

### Styling
CSS modules are used for component styling to avoid conflicts and improve maintainability.

## Deployment Guide

### Prerequisites
- Node.js v18+
- PostgreSQL 16
- Redis 7.2
- ZetaChain testnet access
- Google Gemini API key
- Chainlink API access

### Backend Deployment

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (copy [.env.example](../.env.example) to `.env` and fill in values)
4. Set up database:
   ```bash
   psql -f database/schema.sql
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Navigate to frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the application:
   ```bash
   npm run build
   ```
4. Deploy the build folder to your web server

### Smart Contract Deployment

1. Navigate to contracts directory
2. Compile contracts:
   ```bash
   npx hardhat compile
   ```
3. Deploy to ZetaChain testnet:
   ```bash
   npx hardhat run scripts/deploy.js --network zetachain-testnet
   ```

### Monitoring and Maintenance

- Set up logging with Winston or similar
- Implement health checks
- Set up automated backups for the database
- Monitor API usage and performance
- Regularly update dependencies for security

## Security Considerations

1. **Smart Contract Security**:
   - Formal verification with Mythril/Slither
   - Timelock for critical functions
   - Emergency pause functionality

2. **API Security**:
   - Rate limiting
   - API key protection
   - Input validation

3. **Data Security**:
   - Encryption at rest (AES-256-GCM)
   - TLS 1.3 for data in transit
   - No storage of private keys

4. **Wallet Security**:
   - Client-side wallet connections only
   - Signature verification
   - Secure transaction signing

## Performance Optimization

1. **Caching**:
   - Redis for frequently accessed data
   - API response caching

2. **Database Optimization**:
   - Proper indexing
   - Query optimization
   - Connection pooling

3. **Frontend Optimization**:
   - Code splitting with React.lazy
   - Asset compression
   - CDN for static assets

4. **API Optimization**:
   - Request batching
   - Edge computing with Vercel Edge Functions
   - Efficient data fetching

## Testing Strategy

1. **Unit Testing**:
   - Jest for backend services
   - Mocha/Chai for smart contracts
   - React Testing Library for frontend components

2. **Integration Testing**:
   - API integration tests
   - Blockchain integration tests
   - End-to-end workflow tests

3. **Performance Testing**:
   - Load testing with Artillery
   - Stress testing
   - Response time monitoring

4. **Security Testing**:
   - Smart contract auditing
   - Penetration testing
   - Vulnerability scanning

## Future Enhancements

1. **Mobile Application**: React Native app for iOS/Android
2. **Advanced Analytics**: Integration with analytics platforms
3. **Governance**: DAO governance mechanisms
4. **Yield Optimization**: Integration with DeFi yield farming
5. **Multi-language Support**: Internationalization
6. **Advanced AI Features**: More sophisticated AI models