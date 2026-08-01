-- Migration 004: Add role column to users table for RBAC (Role Based Access Control)
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
