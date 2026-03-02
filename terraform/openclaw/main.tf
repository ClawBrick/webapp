# OpenClaw VM Provisioning Module for UpCloud
# Uses the official UpCloudLtd/upcloud Terraform provider

terraform {
  required_version = ">= 1.0"
  required_providers {
    upcloud = {
      source  = "UpCloudLtd/upcloud"
      version = "~> 5.0"
    }
  }
}

provider "upcloud" {
  username = var.upcloud_username
  password = var.upcloud_password
}

# Generate cloud-init user data
locals {
  user_data = templatefile("${path.module}/bootstrap.sh", {
    user_id            = var.user_id
    agent_id           = var.agent_id
    llm_provider       = var.llm_provider
    llm_model          = var.llm_model
    telegram_bot_token = var.telegram_bot_token
    api_key            = var.api_key
    gateway_token      = var.gateway_token
    subdomain          = var.subdomain
    domain             = var.domain
    admin_email        = var.admin_email
  })
}

# OpenClaw server instance
resource "upcloud_server" "openclaw" {
  hostname = "openclaw-${var.agent_id}"
  zone     = var.upcloud_zone
  plan     = var.upcloud_plan
  firewall = true
  metadata = true

  template {
    # Ubuntu 24.04 LTS (Noble Numbat) — UpCloud OS template name
    storage = "Ubuntu Server 24.04 LTS (Noble Numbat)"
    size    = 25
  }

  # Public network interface
  network_interface {
    type = "public"
  }

  # SSH login
  login {
    user = "root"
    keys = var.ssh_public_keys
    create_password = false
  }

  user_data = local.user_data

  labels = {
    service = "openclaw"
    agent   = var.agent_id
    user    = var.user_id
  }
}

# Firewall rules for the OpenClaw instance
resource "upcloud_firewall_rules" "openclaw" {
  server_id = upcloud_server.openclaw.id

  # Allow HTTP inbound
  firewall_rule {
    action                       = "accept"
    direction                    = "in"
    protocol                     = "tcp"
    destination_port_range_start = 80
    destination_port_range_end   = 80
    comment                      = "Allow HTTP"
  }

  # Allow HTTPS inbound
  firewall_rule {
    action                       = "accept"
    direction                    = "in"
    protocol                     = "tcp"
    destination_port_range_start = 443
    destination_port_range_end   = 443
    comment                      = "Allow HTTPS"
  }

  # Allow SSH from control server only
  firewall_rule {
    action                       = "accept"
    direction                    = "in"
    protocol                     = "tcp"
    source_address_start         = var.control_server_ip
    source_address_end           = var.control_server_ip
    destination_port_range_start = 22
    destination_port_range_end   = 22
    comment                      = "Allow SSH from control server"
  }

  # Drop all other inbound traffic (default deny)
  firewall_rule {
    action    = "drop"
    direction = "in"
    comment   = "Default deny all inbound"
  }
}

# Outputs
output "instance_id" {
  value       = upcloud_server.openclaw.id
  description = "UpCloud server ID"
}

output "main_ip" {
  value       = upcloud_server.openclaw.network_interface[0].ip_address
  description = "Main public IP address of the instance"
}

output "status" {
  value       = upcloud_server.openclaw.state
  description = "Instance state"
}
