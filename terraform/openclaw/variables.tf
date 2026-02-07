# Required variables
variable "vultr_api_key" {
  description = "Vultr API key"
  type        = string
  sensitive   = true
}

variable "user_id" {
  description = "ClawBrick user ID"
  type        = string
}

variable "agent_id" {
  description = "Agent/instance ID"
  type        = string
}

variable "llm_provider" {
  description = "LLM provider (anthropic, openai, openrouter, ollama)"
  type        = string
  validation {
    condition     = contains(["anthropic", "openai", "openrouter", "ollama"], var.llm_provider)
    error_message = "LLM provider must be one of: anthropic, openai, openrouter, ollama"
  }
}

variable "llm_model" {
  description = "LLM model name"
  type        = string
}

variable "telegram_bot_token" {
  description = "Telegram bot token for the agent"
  type        = string
  sensitive   = true
}

variable "api_key" {
  description = "API key for the LLM provider"
  type        = string
  sensitive   = true
}

variable "gateway_token" {
  description = "Pre-generated gateway authentication token"
  type        = string
  sensitive   = true
}

variable "subdomain" {
  description = "Subdomain for the instance"
  type        = string
}

variable "domain" {
  description = "Base domain for the instance"
  type        = string
  default     = "clawbrick.com"
}

variable "admin_email" {
  description = "Admin email for Let's Encrypt certificates"
  type        = string
  default     = "support@clawbrick.com"
}

variable "control_server_ip" {
  description = "IP address of the control server for SSH access"
  type        = string
}

# Optional variables with defaults
variable "vultr_region" {
  description = "Vultr region for deployment"
  type        = string
  default     = "bom"  # Mumbai, India
}

variable "vultr_plan" {
  description = "Vultr plan ID"
  type        = string
  default     = "vc2-1c-2gb"  # 1 vCPU, 2GB RAM
}
