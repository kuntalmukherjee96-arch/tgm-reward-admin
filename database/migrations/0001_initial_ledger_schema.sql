-- ==========================================
-- DEFINING STRICT POSTGRESQL ENUMS
-- ==========================================
CREATE TYPE platform_enum AS ENUM ('telegram', 'web', 'android', 'ios');
CREATE TYPE task_status_enum AS ENUM ('started', 'completed', 'expired');
CREATE TYPE withdraw_status_enum AS ENUM ('pending', 'approved', 'rejected', 'flagged');
CREATE TYPE transaction_type_enum AS ENUM ('task_completion', 'daily_bonus', 'referral_commission', 'withdrawal_deduction');

-- ==========================================
-- MODULE 1: CORE IDENTITY PLATFORM
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    risk_level INTEGER DEFAULT 0 CHECK (risk_level BETWEEN 0 AND 100),
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE user_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    platform platform_enum NOT NULL, 
    platform_user_id VARCHAR(255) NOT NULL, 
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    CONSTRAINT unique_platform_identity UNIQUE (platform, platform_user_id)
);

CREATE TABLE exchange_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    points_currency VARCHAR(10) DEFAULT 'POINTS',
    fiat_currency VARCHAR(10) DEFAULT 'INR',
    points_to_fiat_ratio NUMERIC(10, 4) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    effective_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- MODULE 2: IDEMPOTENCY LAYER WITH TTL
-- ==========================================
CREATE TABLE idempotency_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idempotency_key VARCHAR(255) UNIQUE NOT NULL,
    request_path VARCHAR(255) NOT NULL,
    response_code INTEGER NOT NULL,
    response_body JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- ==========================================
-- MODULE 3: PARTITIONED DOMAIN EVENT STORE (Transactional Outbox)
-- ==========================================
CREATE TABLE domain_events (
    id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL, 
    aggregate_id UUID NOT NULL, 
    payload JSONB NOT NULL,
    request_id UUID NOT NULL,
    trace_id UUID NOT NULL,
    correlation_id UUID NOT NULL,
    is_processed_outbox BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- July 2026-এর জন্য প্রাথমিক পার্টীশন
CREATE TABLE domain_events_y2026m07 PARTITION OF domain_events
    FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-08-01 00:00:00+00');

-- ==========================================
-- MODULE 4: PARTITIONED FINANCIAL LEDGER (Source of Truth)
-- ==========================================
CREATE TABLE point_transactions (
    id UUID NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    type transaction_type_enum NOT NULL, 
    amount INTEGER NOT NULL, 
    reference_type VARCHAR(50) NOT NULL, 
    reference_id UUID NOT NULL, 
    correlation_id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE TABLE point_transactions_y2026m07 PARTITION OF point_transactions
    FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-08-01 00:00:00+00');

-- ==========================================
-- MODULE 5: TASKS & WITHDRAWALS ENGINE
-- ==========================================
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(30) DEFAULT 'all',
    task_type VARCHAR(50) NOT NULL, 
    title VARCHAR(255) NOT NULL,
    reward_points INTEGER NOT NULL CHECK (reward_points > 0),
    cooldown_seconds INTEGER DEFAULT 120,
    daily_limit INTEGER DEFAULT 10,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE task_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    platform platform_enum NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    country VARCHAR(10),
    auth_payload_hash TEXT NOT NULL, 
    status task_status_enum DEFAULT 'started', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE withdraw_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    payment_method VARCHAR(50) NOT NULL, 
    destination_address VARCHAR(255) NOT NULL, 
    points_requested INTEGER NOT NULL CHECK (points_requested > 0),
    amount_in_cash NUMERIC(10, 2) NOT NULL, 
    status withdraw_status_enum DEFAULT 'pending', 
    ip_address VARCHAR(45),
    transaction_id VARCHAR(255),
    review_reason TEXT,
    rejected_reason TEXT,
    reviewed_by UUID,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- PERFORMANCE TUNING: DB INDEXES
-- ==========================================
CREATE INDEX idx_users_active ON users(id) WHERE deleted_at IS NULL;
CREATE INDEX idx_idempotency_ttl ON idempotency_keys(expires_at);
CREATE INDEX idx_task_sessions_active ON task_sessions(user_id, status);