#!/usr/bin/env bash
set -e

# Start tailscaled in the background
/usr/local/bin/tailscaled --state=mem: --socket=/tmp/tailscaled.sock &

# Wait a bit for tailscaled to start
sleep 2

# Authenticate with tailscale using auth key (set this as a secret in Fly)
tailscale up --authkey=${TAILSCALE_AUTH_KEY} --hostname=fly-app

# Now tailscale should be connected, and you have a Tailscale IP

# Start uvicorn
exec uvicorn main:app --host 0.0.0.0 --port 8080