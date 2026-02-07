// User Types
export interface User {
  id: string;
  wallet_address: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

// Agent Types
export type AgentStatus = 'running' | 'stopped' | 'error' | 'deploying';

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  configuration: AgentConfiguration;
  status: AgentStatus;
  skills: string[];
  created_at: string;
  updated_at: string;
}

export interface AgentConfiguration {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  system_prompt?: string;
  [key: string]: unknown;
}

export interface CreateAgentRequest {
  name: string;
  description?: string;
  configuration?: AgentConfiguration;
  skills?: string[];
}

export interface UpdateAgentRequest {
  name?: string;
  description?: string;
  configuration?: AgentConfiguration;
  skills?: string[];
  status?: AgentStatus;
}

// Skill Types
export interface Skill {
  id: string;
  publisher_id: string;
  name: string;
  description: string;
  category: string;
  markdown_content: string;
  api_endpoint?: string;
  version: string;
  is_public: boolean;
  downloads: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSkillRequest {
  name: string;
  description: string;
  category: string;
  markdown_content: string;
  api_endpoint?: string;
  version?: string;
  is_public?: boolean;
}

export interface SkillFilters {
  category?: string;
  search?: string;
  publisher_id?: string;
}

// Pre-order Types
export type PreorderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Preorder {
  id: string;
  user_id: string;
  quantity: number;
  shipping_address: ShippingAddress;
  contact_email: string;
  status: PreorderStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  full_name: string;
  street_address: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
}

export interface CreatePreorderRequest {
  quantity: number;
  shipping_address: ShippingAddress;
  contact_email: string;
  notes?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}
