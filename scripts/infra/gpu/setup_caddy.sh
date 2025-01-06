#!/usr/bin/env bash

set -e

############################################
# 1. Check for root or sudo
############################################
if [[ $EUID -ne 0 ]]; then
  echo "Please run as root or via sudo."
  exit 1
fi

############################################
# 2. Variables
############################################
CADDY_REPO_URL="https://dl.cloudsmith.io/public/caddy/stable/gpg.key"
CADDY_LIST_URL="https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt"
CLOUDFLARE_TOKEN="hY6vEnMKkzn5HiCbXSMXajzPGngVZ-l45SxCmgTc"
CADDYFILE_PATH="/etc/caddy/Caddyfile"

# Make sure the CLOUDFLARE_API_TOKEN is set
if [[ -z "$CLOUDFLARE_TOKEN" ]]; then
  echo "Error: CLOUDFLARE_API_TOKEN environment variable is not set."
  echo "       Please set it (e.g. export CLOUDFLARE_API_TOKEN=...) and re-run."
  exit 1
fi

############################################
# 3. Install Caddy
#    Official Debian/Ubuntu-based approach
############################################
# 3.1 Install dependencies for apt to be able to use HTTPS
#apt-get update -y
#apt-get install -y debian-keyring debian-archive-keyring apt-transport-https ca-certificates curl

# 3.2 Add Caddy's GPG key
curl -1s "${CADDY_REPO_URL}" | gpg --dearmor | tee /usr/share/keyrings/caddy-stable-archive-keyring.gpg > /dev/null

# 3.3 Add Caddy's repository
curl -1s "${CADDY_LIST_URL}" | tee /etc/apt/sources.list.d/caddy-stable.list

# 3.4 Update and install
apt-get update -y
apt-get install -y caddy

############################################
# 4. Write the Caddyfile
############################################
# Create the Caddy directory if it doesn't exist
mkdir -p /etc/caddy

cat << 'EOF' > "${CADDYFILE_PATH}"
{
	email adnan.f.wahab@gmail.com
	admin :2019
	debug
}

files.learn-math.org {
	tls {
		dns cloudflare {env.CLOUDFLARE_API_TOKEN}
		resolvers 1.1.1.1
	}
	root * /home/adnan/derp/support_bret
	file_server browse
	header Access-Control-Allow-Origin *
	header Access-Control-Allow-Methods "GET, POST, OPTIONS"
	header Access-Control-Allow-Headers "Content-Type"
}

jupyter.learn-math.org {
	tls {
		dns cloudflare {env.CLOUDFLARE_API_TOKEN}
		resolvers 1.1.1.1
	}
	reverse_proxy localhost:8888
	header Access-Control-Allow-Origin *
	header Access-Control-Allow-Methods "GET, POST, OPTIONS"
	header Access-Control-Allow-Headers "Content-Type"
}

learn-math.org {
	tls {
		dns cloudflare {env.CLOUDFLARE_API_TOKEN}
		resolvers 1.1.1.1
	}

	route /status_page {
		respond "status page"
	}

	route /files {
		root * /home/adnan/homelab
		file_server browse
		header Access-Control-Allow-Origin *
		header Access-Control-Allow-Methods "GET, POST, OPTIONS"
		header Access-Control-Allow-Headers "Content-Type"
	}

	route /* {
		reverse_proxy localhost:8000
	}

	# Add logging for this site
	log {
		output file /home/adnan/derp/log/caddy/learn-math.org.log {
			roll_size 10MiB
			roll_keep 5
			roll_gzip
		}
	}

	header Access-Control-Allow-Origin *
	header Access-Control-Allow-Methods "GET, POST, OPTIONS"
	header Access-Control-Allow-Headers "Content-Type"
}
EOF

############################################
# 5. Enable and start Caddy
############################################
systemctl enable caddy
systemctl restart caddy

############################################
# 6. Print success message
############################################
echo "Caddy has been installed and configured!"
echo "Your Caddyfile is located at: ${CADDYFILE_PATH}"
echo "Cloudflare token is set via environment variable: CLOUDFLARE_API_TOKEN"
echo "Caddy is now running with systemd."
