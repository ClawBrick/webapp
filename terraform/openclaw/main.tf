# OpenClaw VM Provisioning Module for Vultr

terraform {
  required_version = ">= 1.0"
  required_providers {
    vultr = {
      source  = "vultr/vultr"
      version = "~> 2.17"
    }
  }
}

provider "vultr" {
  api_key = var.vultr_api_key
}

# Firewall group for OpenClaw instances
resource "vultr_firewall_group" "openclaw" {
  description = "OpenClaw instance firewall"
}

# Allow HTTP
resource "vultr_firewall_rule" "http" {
  firewall_group_id = vultr_firewall_group.openclaw.id
  protocol          = "tcp"
  ip_type           = "v4"
  subnet            = "0.0.0.0"
  subnet_size       = 0
  port              = "80"
  notes             = "Allow HTTP"
}

# Allow HTTPS
resource "vultr_firewall_rule" "https" {
  firewall_group_id = vultr_firewall_group.openclaw.id
  protocol          = "tcp"
  ip_type           = "v4"
  subnet            = "0.0.0.0"
  subnet_size       = 0
  port              = "443"
  notes             = "Allow HTTPS"
}

# Allow SSH from control server only
resource "vultr_firewall_rule" "ssh" {
  firewall_group_id = vultr_firewall_group.openclaw.id
  protocol          = "tcp"
  ip_type           = "v4"
  subnet            = var.control_server_ip
  subnet_size       = 32
  port              = "22"
  notes             = "Allow SSH from control server"
}

# Generate cloud-init user data
locals {
  user_data = templatefile("${path.module}/bootstrap.sh", {
    user_id             = var.user_id
    agent_id            = var.agent_id
    llm_provider        = var.llm_provider
    llm_model           = var.llm_model
    telegram_bot_token  = var.telegram_bot_token
    api_key             = var.api_key
    gateway_token       = var.gateway_token
    subdomain           = var.subdomain
    domain              = var.domain
    admin_email         = var.admin_email
  })
}

# OpenClaw VM instance
resource "vultr_instance" "openclaw" {
  plan              = var.vultr_plan
  region            = var.vultr_region
  os_id             = 2284  # Ubuntu 24.04 LTS x64
  label             = "openclaw-${var.agent_id}"
  hostname          = var.subdomain
  firewall_group_id = vultr_firewall_group.openclaw.id
  user_data         = base64encode(local.user_data)
  
  tags = [
    "openclaw",
    "agent-${var.agent_id}",
    "user-${var.user_id}"
  ]
}

# Outputs
output "instance_id" {
  value       = vultr_instance.openclaw.id
  description = "Vultr instance ID"
}

output "main_ip" {
  value       = vultr_instance.openclaw.main_ip
  description = "Main IP address of the instance"
}

output "status" {
  value       = vultr_instance.openclaw.status
  description = "Instance status"
}
