#!/bin/bash
set -euo pipefail

# OpenClaw Bootstrap Script for ClawBrick
# This script is run via cloud-init on first boot

# Load configuration from a local env file if present.
# This allows running the script manually (e.g. on UpCloud)
# with values kept in the project folder instead of hardcoding.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/openclaw.env"

if [ -f "$CONFIG_FILE" ]; then
  # shellcheck source=/dev/null
  . "$CONFIG_FILE"
fi

exec > >(tee /var/log/openclaw-bootstrap.log) 2>&1
echo "=== OpenClaw Bootstrap Started at $(date) ==="

# Variables (injected by Terraform, environment, or openclaw.env)
USER_ID="${USER_ID:-${user_id:-}}"
AGENT_ID="${AGENT_ID:-${agent_id:-}}"
LLM_PROVIDER="${LLM_PROVIDER:-${llm_provider:-}}"
LLM_MODEL="${LLM_MODEL:-${llm_model:-}}"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-${telegram_bot_token:-}}"
API_KEY="${API_KEY:-${api_key:-}}"
GATEWAY_TOKEN="${GATEWAY_TOKEN:-${gateway_token:-}}"
SUBDOMAIN="${SUBDOMAIN:-${subdomain:-}}"
DOMAIN="${DOMAIN:-${domain:-}}"
ADMIN_EMAIL="${ADMIN_EMAIL:-${admin_email:-}}"

# Basic validation to fail fast if required values are missing
: "${USER_ID:?USER_ID (or user_id) must be set}"
: "${AGENT_ID:?AGENT_ID (or agent_id) must be set}"
: "${LLM_PROVIDER:?LLM_PROVIDER (or llm_provider) must be set}"
: "${LLM_MODEL:?LLM_MODEL (or llm_model) must be set}"
: "${TELEGRAM_BOT_TOKEN:?TELEGRAM_BOT_TOKEN (or telegram_bot_token) must be set}"
: "${API_KEY:?API_KEY (or api_key) must be set}"
: "${GATEWAY_TOKEN:?GATEWAY_TOKEN (or gateway_token) must be set}"
: "${SUBDOMAIN:?SUBDOMAIN (or subdomain) must be set}"
: "${DOMAIN:?DOMAIN (or domain) must be set}"
: "${ADMIN_EMAIL:?ADMIN_EMAIL (or admin_email) must be set}"

# System update
echo ">>> Updating system..."
apt-get update && apt-get upgrade -y
apt-get install -y curl wget gnupg2 software-properties-common ufw

# Install Node.js 22
echo ">>> Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
node --version
npm --version

# Install pnpm
echo ">>> Installing pnpm..."
npm install -g pnpm

# Create openclaw user
echo ">>> Creating openclaw user..."
useradd -m -s /bin/bash -u 1000 openclaw || true

# Install OpenClaw globally (idempotent)
echo ">>> Installing OpenClaw..."
if command -v openclaw >/dev/null 2>&1; then
  echo "OpenClaw already installed, skipping npm install."
else
  if [ -d /usr/lib/node_modules/openclaw ]; then
    echo "Existing /usr/lib/node_modules/openclaw found, removing before reinstall..."
    rm -rf /usr/lib/node_modules/openclaw
  fi
  npm install -g openclaw@latest
fi

# Create OpenClaw directories
echo ">>> Setting up OpenClaw directories..."
mkdir -p /home/openclaw/.openclaw
chown -R openclaw:openclaw /home/openclaw

# Determine API key environment variable name
case "$LLM_PROVIDER" in
  anthropic)
    API_KEY_VAR="ANTHROPIC_API_KEY"
    ;;
  openai)
    API_KEY_VAR="OPENAI_API_KEY"
    ;;
  openrouter)
    API_KEY_VAR="OPENROUTER_API_KEY"
    ;;
  *)
    API_KEY_VAR="LLM_API_KEY"
    ;;
esac

# Create OpenClaw configuration
echo ">>> Creating OpenClaw configuration..."
cat > /home/openclaw/.openclaw/openclaw.json << EOF
{
  "agent": {
    "model": "$LLM_MODEL"
  },
  "gateway": {
    "auth": {
      "token": "$GATEWAY_TOKEN"
    },
    "port": 18789
  },
  "channels": {
    "telegram": {
      "enabled": true
    }
  }
}
EOF

# Create environment file
cat > /home/openclaw/.openclaw/.env << EOF
TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN
$API_KEY_VAR=$API_KEY
EOF

# Add OpenRouter base URL if needed
if [ "$LLM_PROVIDER" = "openrouter" ]; then
  echo "OPENROUTER_BASE_URL=https://openrouter.ai/api/v1" >> /home/openclaw/.openclaw/.env
fi

chown -R openclaw:openclaw /home/openclaw/.openclaw
chmod 600 /home/openclaw/.openclaw/.env
chmod 600 /home/openclaw/.openclaw/openclaw.json

# Install and configure Caddy
echo ">>> Installing Caddy..."
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update
apt-get install -y caddy

# Configure Caddy with reverse proxy
echo ">>> Configuring Caddy..."
cat > /etc/caddy/Caddyfile << EOF
{
  email $ADMIN_EMAIL
}

$SUBDOMAIN.$DOMAIN {
  reverse_proxy localhost:18789
}

# Fallback for IP-based access
:443 {
  tls internal
  reverse_proxy localhost:18789
}
EOF

# Create OpenClaw systemd service
echo ">>> Creating OpenClaw systemd service..."
cat > /etc/systemd/system/openclaw.service << EOF
[Unit]
Description=OpenClaw AI Assistant Gateway
After=network.target

[Service]
Type=simple
User=openclaw
WorkingDirectory=/home/openclaw
Environment=HOME=/home/openclaw
EnvironmentFile=/home/openclaw/.openclaw/.env
ExecStart=/usr/bin/openclaw gateway --port 18789
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Configure firewall
echo ">>> Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable

# Run OpenClaw onboard
echo ">>> Running OpenClaw onboard..."
su - openclaw -c "cd /home/openclaw && openclaw onboard --install-daemon" || true

# Enable and start services
echo ">>> Starting services..."
systemctl daemon-reload
systemctl enable openclaw
systemctl start openclaw
systemctl restart caddy

# Wait for services to start
sleep 5

# Health check
echo ">>> Running health check..."
if curl -s http://localhost:18789 > /dev/null 2>&1; then
  echo ">>> OpenClaw gateway is accessible!"
else
  echo ">>> Warning: Gateway not responding yet, may need more time to start"
fi

# Final status
echo "=== OpenClaw Bootstrap Completed at $(date) ==="
echo "Gateway URL: https://$SUBDOMAIN.$DOMAIN"
echo "Gateway Token: [REDACTED - stored in ClawBrick]"
