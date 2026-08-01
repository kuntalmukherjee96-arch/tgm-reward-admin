CREATE OR REPLACE VIEW view_user_balances AS
SELECT 
    u.id AS user_id,
    u.risk_level,
    u.is_banned,
    COALESCE(SUM(pt.amount), 0) AS available_points,
    COALESCE(SUM(CASE WHEN pt.amount > 0 THEN pt.amount ELSE 0 END), 0) AS lifetime_points,
    COALESCE(ABS(SUM(CASE WHEN pt.amount < 0 THEN pt.amount ELSE 0 END)), 0) AS total_withdrawn_points
FROM users u
LEFT JOIN point_transactions pt ON u.id = pt.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.id;