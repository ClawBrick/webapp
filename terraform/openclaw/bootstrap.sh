#!/bin/bash
set -euo pipefail

# OpenClaw Bootstrap Script for ClawBrick
# This script is run via cloud-init on first boot

exec > >(tee /var/log/openclaw-bootstrap.log) 2>&1
echo "=== OpenClaw Bootstrap Started at $(date) ==="

# Variables (injected by Terraform)
USER_ID="${user_id}"
AGENT_ID="${agent_id}"
LLM_PROVIDER="${llm_provider}"
LLM_MODEL="${llm_model}"
TELEGRAM_BOT_TOKEN="${telegram_bot_token}"
API_KEY="${api_key}"
GATEWAY_TOKEN="${gateway_token}"
SUBDOMAIN="${subdomain}"
DOMAIN="${domain}"
ADMIN_EMAIL="${admin_email}"

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

# Install OpenClaw globally
echo ">>> Installing OpenClaw..."
npm install -g openclaw@latest

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
