#!/usr/bin/env bash
#
# Script to manually issue an SSL certificate for learn-math.org
# using acme.sh in manual DNS mode, then configure Caddy to use it.
#
# Usage:
#   1) Make sure acme.sh is installed in your $HOME/.acme.sh directory (or adapt paths).
#   2) Run this script.
#   3) acme.sh will prompt you to manually create DNS TXT records.
#   4) After creating the DNS records and they propagate, re-run the script or follow acme.sh instructions.
#   5) This script installs the cert into /etc/ssl/learn-math.org and updates Caddy’s config.

set -e  # Exit on error

DOMAIN="learn-math.org"

# Ensure acme.sh is on your PATH; adjust if needed.
ACME_SH_HOME="$HOME/.acme.sh"
export PATH="$ACME_SH_HOME:$PATH"

# 1. Issue certificate in manual DNS mode
#    --yes-I-know-dns-manual-mode-enough-go-ahead-please acknowledges that you will manually add TXT records.
echo "Step 1: Issuing certificate for $DOMAIN in manual DNS mode..."
acme.sh --issue \
  -d "$DOMAIN" \
  --dns \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please

# -----------------------------------------------------------------------------
# If acme.sh shows instructions like:
#     _acme-challenge.learn-math.org. IN TXT "someRandomString"
# then you must log into your DNS provider, create that TXT record,
# and wait for DNS to propagate before continuing.
#
# If the script exits here or says 'verification needed', follow
# the acme.sh instructions. Then rerun this script (or an adjusted command)
# once the TXT record is live.
# -----------------------------------------------------------------------------

# 2. Install the issued certificate and key to /etc/ssl/learn-math.org
echo "Step 2: Installing cert/key to /etc/ssl/$DOMAIN..."
sudo mkdir -p /etc/ssl/$DOMAIN

acme.sh --install-cert -d "$DOMAIN" \
  --key-file       /etc/ssl/$DOMAIN/privkey.pem \
  --fullchain-file /etc/ssl/$DOMAIN/fullchain.pem \
  --reloadcmd      "systemctl reload caddy"

# 3. Create/Update your Caddyfile to point to the manually-installed cert
echo "Step 3: Configuring Caddy to use manual cert for $DOMAIN..."
cat <<EOF | sudo tee /etc/caddy/Caddyfile
{
	# Global options
	admin localhost:2019
	debug
	# (Optional) If you have a global email or anything else, specify here
}

$DOMAIN {
	tls /etc/ssl/$DOMAIN/fullchain.pem /etc/ssl/$DOMAIN/privkey.pem
	respond "Hello, from $DOMAIN with manual cert!"
}
EOF

# 4. Reload Caddy
echo "Step 4: Reloading Caddy..."
sudo systemctl reload caddy

echo "Done! The manually issued certificate for $DOMAIN is now installed and served by Caddy."
