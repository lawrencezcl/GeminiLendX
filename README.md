# GeminiLend X

Cross-Chain Lending Platform with AI-Powered Assistance

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg)](https://nodejs.org/)
[![ZetaChain](https://img.shields.io/badge/ZetaChain-Supported-brightgreen.svg)](https://zetachain.com/)

## Project Overview

GeminiLend X is a revolutionary cross-chain lending platform that leverages ZetaChain for seamless multi-chain asset management and Google Gemini for intelligent lending assistance. The platform enables users to use assets from multiple blockchains (Solana, Bitcoin, Base, Avalanche) as collateral without manual cross-chain transfers.

## Key Features

### 1. Cross-Chain Asset Integration Module
- **Single-Wallet Multi-Chain Asset View**: Unified dashboard for all your cross-chain assets
- **Cross-Chain Asset Mapping**: Seamless collateralization across chains
- **Multi-Chain Asset Health Monitoring**: Real-time health metrics and alerts

### 2. Gemini AI Intelligent Assistance Module
- **Natural Language Lending Request Parsing**: Describe your loan needs in plain English
- **Cross-Chain Credit Score Calculation**: AI-powered credit assessment
- **Dynamic Asset Allocation Recommendations**: Smart suggestions for optimal lending

### 3. Social Lending Module
- **Social Endorsement Smart Contract**: Reduce rates through trusted endorsements
- **Endorser Fee Distribution**: Reward community members for participation
- **Vertical Lending Circles**: Specialized lending groups with benefits

### 4. Cross-Chain Lending Execution Module
- **Loan Initiation & Fund Disbursement**: Secure cross-chain loan processing
- **Flexible Multi-Chain Repayment**: Repay with any supported asset
- **Automated Cross-Chain Liquidation**: Risk-managed liquidation processes

## Technical Architecture

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

### Core Technologies
- **Smart Contracts**: ZetaChain Universal Smart Contracts (USC)
- **AI Integration**: Google Gemini Pro API v1.5
- **Frontend**: React with Chart.js and modern UI components
- **Backend**: Node.js with Express framework
- **Database**: PostgreSQL with Redis caching
- **Wallet Integration**: MetaMask, Phantom, ZetaChain Wallet Adapter
- **Price Feeds**: Chainlink Price Feeds v3.0+
- **Notifications**: SendGrid, WebSocket

## Prerequisites

- Node.js v16.0.0 or higher
- npm v7.0.0 or higher
- PostgreSQL database
- Redis cache
- API keys for:
  - ZetaChain
  - Google Gemini Pro
  - Chainlink
  - CoinGecko
  - SendGrid

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gemini-lend-x.git
   cd gemini-lend-x
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Set up the database:**
   ```bash
   # Run the database schema
   psql -f database/schema.sql
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Asset Management
- `GET /api/assets/:userAddress` - Get user's cross-chain asset view
- `POST /api/assets/map` - Map asset for collateral
- `POST /api/assets/unmap` - Unmap asset after repayment
- `GET /api/assets/health/:userAddress` - Monitor asset health

### Lending Operations
- `POST /api/loans/initiate` - Initiate a new loan
- `POST /api/loans/repay` - Repay a loan
- `POST /api/loans/liquidate` - Liquidate an under-collateralized loan
- `GET /api/loans/:loanId` - Get loan details

### AI Services
- `POST /api/ai/parse-request` - Parse natural language lending request
- `GET /api/ai/credit-score/:userId` - Calculate user's credit score
- `GET /api/ai/recommendations` - Generate asset allocation recommendations
- `POST /api/ai/loan-advice` - Get AI-powered loan advice

## Smart Contracts

The platform uses ZetaChain Universal Smart Contracts (USC) for all cross-chain operations:

- **Asset Management**: Cross-chain asset locking and minting
- **Loan Processing**: Loan initiation, repayment, and liquidation
- **Social Features**: Endorsement verification and fee distribution
- **Security**: Timelock for critical functions, emergency pause

## Performance & Security

### Performance
- Frontend load time: ≤ 2 seconds initially, ≤ 1 second subsequently
- API response time: ≤ 3 seconds for all calls
- Cross-chain transactions: ≤ 30 seconds with WebSocket status tracking

### Security
- Smart contract formal verification with Mythril/Slither
- 24-hour timelock for critical functions
- Emergency pause functionality via multisig wallet
- AES-256-GCM encryption for user data at rest
- TLS 1.3 for all data in transit
- Monthly API key rotation

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Deployment

### Backend
```bash
npm start
```

### Frontend
```bash
# Build for production
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ZetaChain](https://zetachain.com/) for cross-chain infrastructure
- [Google Gemini](https://ai.google/) for AI capabilities
- [Chainlink](https://chain.link/) for price feeds
- [MetaMask](https://metamask.io/) and [Phantom](https://phantom.app/) for wallet integration

## Support

For support, please open an issue on the GitHub repository or contact the development team.