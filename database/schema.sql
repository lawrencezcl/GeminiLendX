-- Database schema for GeminiLend X

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loans table
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    borrower_id INTEGER REFERENCES users(id),
    collateral_asset VARCHAR(50) NOT NULL,
    borrow_asset VARCHAR(50) NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    term INTEGER NOT NULL, -- in days
    interest_rate DECIMAL(5, 2) NOT NULL, -- annual percentage rate
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Endorsements table
CREATE TABLE endorsements (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(id),
    endorser_id INTEGER REFERENCES users(id),
    borrower_id INTEGER REFERENCES users(id),
    percentage DECIMAL(5, 2) NOT NULL, -- 10-30%
    signature TEXT NOT NULL,
    is_valid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit scores table
CREATE TABLE credit_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    score INTEGER NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lending circles table
CREATE TABLE lending_circles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    asset_requirement VARCHAR(50),
    membership_approval VARCHAR(20) DEFAULT 'auto', -- auto or manual
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Circle memberships table
CREATE TABLE circle_memberships (
    id SERIAL PRIMARY KEY,
    circle_id INTEGER REFERENCES lending_circles(id),
    user_id INTEGER REFERENCES users(id),
    is_approved BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee distributions table
CREATE TABLE fee_distributions (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(id),
    endorser_id INTEGER REFERENCES users(id),
    amount DECIMAL(18, 8) NOT NULL,
    distributed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_loans_borrower_id ON loans(borrower_id);
CREATE INDEX idx_endorsements_loan_id ON endorsements(loan_id);
CREATE INDEX idx_credit_scores_user_id ON credit_scores(user_id);
CREATE INDEX idx_circle_memberships_circle_id ON circle_memberships(circle_id);
CREATE INDEX idx_circle_memberships_user_id ON circle_memberships(user_id);