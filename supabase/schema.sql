-- ClawBrick Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agents table (OpenClaw instances)
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  configuration JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'provisioning', 'ready', 'running', 'stopped', 'error', 'destroyed')),
  
  -- Vultr VM fields
  vultr_instance_id TEXT,
  main_ip TEXT,
  subdomain TEXT UNIQUE,
  deploy_region TEXT DEFAULT 'bom',
  
  -- OpenClaw configuration
  llm_provider TEXT CHECK (llm_provider IN ('anthropic', 'openai', 'openrouter', 'ollama')),
  llm_model TEXT,
  telegram_bot_token_encrypted TEXT,
  gateway_token_hash TEXT,
  
  -- Provisioning tracking
  provisioning_started_at TIMESTAMP WITH TIME ZONE,
  provisioning_completed_at TIMESTAMP WITH TIME ZONE,
  provisioning_logs JSONB DEFAULT '[]',
  last_error TEXT,
  
  skills UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  publisher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  markdown_content TEXT NOT NULL,
  api_endpoint TEXT,
  version TEXT DEFAULT '1.0.0',
  is_public BOOLEAN DEFAULT true,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preorders table
CREATE TABLE IF NOT EXISTS preorders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0 AND quantity <= 100),
  shipping_address JSONB NOT NULL,
  contact_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_publisher ON skills(publisher_id);
CREATE INDEX IF NOT EXISTS idx_skills_is_public ON skills(is_public);
CREATE INDEX IF NOT EXISTS idx_preorders_user_id ON preorders(user_id);
CREATE INDEX IF NOT EXISTS idx_preorders_status ON preorders(status);

-- Function to increment skill downloads
CREATE OR REPLACE FUNCTION increment_skill_downloads(skill_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE skills
  SET downloads = downloads + 1,
      updated_at = NOW()
  WHERE id = skill_id;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE preorders ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Agents policies
CREATE POLICY "Users can read own agents" ON agents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own agents" ON agents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agents" ON agents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own agents" ON agents
  FOR DELETE USING (auth.uid() = user_id);

-- Skills policies
CREATE POLICY "Anyone can read public skills" ON skills
  FOR SELECT USING (is_public = true);

CREATE POLICY "Publishers can read own private skills" ON skills
  FOR SELECT USING (auth.uid() = publisher_id);

CREATE POLICY "Authenticated users can create skills" ON skills
  FOR INSERT WITH CHECK (auth.uid() = publisher_id);

CREATE POLICY "Publishers can update own skills" ON skills
  FOR UPDATE USING (auth.uid() = publisher_id);

CREATE POLICY "Publishers can delete own skills" ON skills
  FOR DELETE USING (auth.uid() = publisher_id);

-- Preorders policies
CREATE POLICY "Users can read own preorders" ON preorders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own preorders" ON preorders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Note: This schema assumes you're using Supabase Auth.
-- For wallet-based auth, you'll need to implement custom authentication
-- and adjust the RLS policies accordingly.
