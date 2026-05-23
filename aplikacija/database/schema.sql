DROP TABLE IF EXISTS reward_claims;
DROP TABLE IF EXISTS monthly_calculations;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS rewards;
DROP TABLE IF EXISTS loyalty_points_rules;
DROP TABLE IF EXISTS loyalty_status_rules;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',

    points NUMERIC(10,2) NOT NULL DEFAULT 0,

    status VARCHAR(30) NOT NULL DEFAULT 'osnovni'
        CHECK (status IN ('osnovni', 'bronasti', 'srebrni', 'zlati')),

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_token VARCHAR(255),

    high_spend_months INTEGER NOT NULL DEFAULT 0,
    low_spend_months INTEGER NOT NULL DEFAULT 0,
    bronze_recovery_months INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loyalty_points_rules (
    id SERIAL PRIMARY KEY,
    status VARCHAR(30) NOT NULL
        CHECK (status IN ('osnovni', 'bronasti', 'srebrni', 'zlati')),

    min_amount NUMERIC(10,2) NOT NULL,
    max_amount NUMERIC(10,2),
    points NUMERIC(10,2) NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE loyalty_status_rules (
    id SERIAL PRIMARY KEY,
    rule_key VARCHAR(100) NOT NULL UNIQUE,
    rule_value NUMERIC(10,2) NOT NULL,
    description TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE rewards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    points_required NUMERIC(10,2) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,

    amount NUMERIC(10,2) NOT NULL,
    points NUMERIC(10,2) NOT NULL DEFAULT 0,

    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    processed BOOLEAN NOT NULL DEFAULT FALSE,
    processed_at TIMESTAMP,

    calculation_year INTEGER,
    calculation_month INTEGER,

    CONSTRAINT fk_transactions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE monthly_calculations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,

    calculation_year INTEGER NOT NULL,
    calculation_month INTEGER NOT NULL,

    total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    old_status VARCHAR(30) NOT NULL,
    new_status VARCHAR(30) NOT NULL,
    points_awarded NUMERIC(10,2) NOT NULL DEFAULT 0,

    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_monthly_calculations_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_month
        UNIQUE (user_id, calculation_year, calculation_month)
);

CREATE TABLE reward_claims (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    reward_id INTEGER NOT NULL,

    points_spent NUMERIC(10,2) NOT NULL,
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_claims_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_claims_reward
        FOREIGN KEY (reward_id)
        REFERENCES rewards(id)
        ON DELETE CASCADE
);