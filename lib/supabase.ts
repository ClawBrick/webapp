import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

/**
 * Decrypt an encrypted token
 */
export function decryptToken(encryptedToken: string): string {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) throw new Error("ENCRYPTION_KEY not set");

    const [ivHex, encrypted] = encryptedToken.split(":");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(ivHex, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

/**
 * Encrypt a token for storage
 */
export function encryptToken(token: string): string {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) throw new Error("ENCRYPTION_KEY not set");

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(token, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}

// Server-side Supabase client with service role key for API routes
export function createServerSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Missing Supabase environment variables");
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

// Client-side Supabase client (for browser)
export function createBrowserSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase environment variables");
    }

    return createClient(supabaseUrl, supabaseAnonKey);
}

// Agent types
export interface Agent {
    id: string;
    user_id: string;
    name: string;
    description: string | null;
    configuration: Record<string, unknown>;
    status: "pending" | "provisioning" | "ready" | "running" | "stopped" | "error" | "destroyed";
    // Instance info (matches Terraform outputs)
    vultr_instance_id: string | null;
    instance_id: string | null;  // Alias for vultr_instance_id
    main_ip: string | null;
    instance_ip: string | null;  // Alias for main_ip
    gateway_url: string | null;
    subdomain: string | null;
    deploy_region: string;
    llm_provider: "anthropic" | "openai" | "openrouter" | "ollama" | null;
    llm_model: string | null;
    telegram_bot_token_encrypted: string | null;
    gateway_token_hash: string | null;
    provisioning_started_at: string | null;
    provisioning_completed_at: string | null;
    provisioning_logs: Array<{ timestamp: string; message: string; level: string }>;
    last_error: string | null;
    provisioning_error: string | null;  // Alias for last_error
    skills: string[];
    created_at: string;
    updated_at: string;
}

// LLM Provider options
export const LLM_PROVIDERS = [
    { value: "anthropic", label: "Anthropic", models: ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-sonnet-20240229"] },
    { value: "openai", label: "OpenAI", models: ["gpt-4o", "gpt-4-turbo", "gpt-4"] },
    { value: "openrouter", label: "OpenRouter", models: ["anthropic/claude-3.5-sonnet", "openai/gpt-4o", "google/gemini-pro"] },
    { value: "ollama", label: "Ollama (Local)", models: ["llama3", "mistral", "codellama"] },
] as const;

// Vultr regions
export const VULTR_REGIONS = [
    { value: "bom", label: "Mumbai, India" },
    { value: "del", label: "Delhi, India" },
    { value: "sgp", label: "Singapore" },
    { value: "nrt", label: "Tokyo, Japan" },
    { value: "ewr", label: "New Jersey, US" },
    { value: "lax", label: "Los Angeles, US" },
    { value: "fra", label: "Frankfurt, Germany" },
    { value: "lhr", label: "London, UK" },
] as const;
