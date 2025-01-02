#!/usr/bin/env bash
#
# Usage:
#   ./install_all_deps.sh
#
# This script installs and configures:
#   1) Docker with NVIDIA Docker runtime
#   2) Jetson containers (for Orin devkits, Jetson Nano, etc.)
#   3) LiveKit (self-hosted) via Docker
#   4) 1Password CLI
#   5) GitHub CLI
#   6) Tailscale
#   7) bun, deno, playwright, jupyter, etc.
#   8) Rclone with Google Drive for storing screen recordings
#
# It also includes placeholders for permanent screen capture and
# streaming via LiveKit.

set -euo pipefail

### HELPER FUNCTIONS ###

info() {
  echo -e "\\033[1;34m[INFO]\\033[0m $*"
}

error() {
  echo -e "\\033[1;31m[ERROR]\\033[0m $*" >&2
  exit 1
}

check_root() {
  if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root or via sudo."
  fi
}

### 1. System update & basic packages ###

system_update() {
  info "Updating system packages..."
  apt-get update -y && apt-get upgrade -y
}

install_basic_utils() {
  info "Installing basic utilities..."
  apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common
}

### 2. Install Docker & NVIDIA Container Runtime ###

install_docker() {
  info "Installing Docker CE..."

  # Remove old versions if any
  apt-get remove -y docker docker-engine docker.io containerd runc || true

  # Set up the repository
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
    https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    | tee /etc/apt/sources.list.d/docker.list > /dev/null

  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io
  systemctl enable docker
  systemctl start docker

  # Allow current user to run Docker commands without sudo
  usermod -aG docker "${SUDO_USER:-$USER}" || true
}

install_nvidia_docker() {
  info "Installing NVIDIA Container Runtime..."

  distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
  curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-docker-keyring.gpg
  curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-docker-keyring.gpg] https://#' \
    | tee /etc/apt/sources.list.d/nvidia-docker.list

  apt-get update -y
  apt-get install -y nvidia-docker2

  # Configure Docker to use the NVIDIA runtime by default
  cat <<EOF >/etc/docker/daemon.json
{
  "default-runtime": "nvidia",
  "runtimes": {
    "nvidia": {
      "path": "nvidia-container-runtime",
      "runtimeArgs": []
    }
  }
}
EOF

  systemctl restart docker
}

### 3. Set up Jetson containers (placeholder) ###
# You may need the official NVIDIA container images for Jetson
# and to run them differently for ARM64. Adjust these as needed.

setup_jetson_containers() {
  info "Pulling Jetson container images (example placeholders)..."
  # Examples:
  # docker pull nvcr.io/nvidia/l4t-jetpack:r35.2.1  # for Jetson Orin
  # docker pull nvcr.io/nvidia/l4t-base:r32.7.1    # for Jetson Nano
  # ...
  # Customize as needed for your environment.
  true
}

### 4. Install LiveKit self-hosted via Docker ###

install_livekit() {
  info "Installing LiveKit server..."

  # Simple approach: Pull official livekit server image
  # More advanced: Use docker-compose or environment variables for config
  docker pull livekit/livekit-server:latest

  # Example systemd or docker-compose approach:
  # cat <<EOF > /etc/systemd/system/livekit.service
  # [Unit]
  # Description=LiveKit Server
  # After=docker.service
  #
  # [Service]
  # ExecStart=/usr/bin/docker run \
  #   --name livekit \
  #   -p 7880:7880 \
  #   -p 7881:7881 \
  #   livekit/livekit-server:latest \
  #   --dev
  # Restart=always
  #
  # [Install]
  # WantedBy=multi-user.target
  # EOF
  #
  # systemctl enable livekit
  # systemctl start livekit

  info "LiveKit setup complete. Configure your environment as needed."
}

### 5. Install 1Password CLI ###

install_1password() {
  info "Checking for 1Password CLI..."

  if command -v op >/dev/null 2>&1; then
    info "1Password CLI is already installed."
    return 0
  fi

  info "Installing 1Password CLI..."
  curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
      sudo gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] \
    https://downloads.1password.com/linux/debian/$(dpkg --print-architecture) stable main" | \
    sudo tee /etc/apt/sources.list.d/1password.list
  sudo mkdir -p /etc/debsig/policies/AC2D62742012EA22/
  curl -sS https://downloads.1password.com/linux/debian/debsig/1password.pol | \
      sudo tee /etc/debsig/policies/AC2D62742012EA22/1password.pol
  sudo mkdir -p /usr/share/debsig/keyrings/AC2D62742012EA22
  curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
      sudo gpg --dearmor --output /usr/share/debsig/keyrings/AC2D62742012EA22/debsig.gpg

  apt-get update -y
  apt-get install -y 1password-cli
}

### 6. Install GitHub CLI ###

install_gh_cli() {
  info "Installing GitHub CLI..."

  type gh >/dev/null 2>&1 && {
    info "GitHub CLI is already installed."
    return 0
  }

  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
    sudo gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
    https://cli.github.com/packages stable main" | \
    tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  apt-get update -y
  apt-get install -y gh
}

### 7. Install Tailscale ###

install_tailscale() {
  info "Installing Tailscale..."

  curl -fsSL https://tailscale.com/install.sh | sh
  # Enable & start Tailscale
  systemctl enable tailscaled
  systemctl start tailscaled

  info "Tailscale installed. Run 'tailscale up' to authenticate."
}

### 8. Install bun, deno, playwright, jupyter, etc. ###

install_web_tools() {
  info "Installing bun..."
  # Official install script
  curl -fsSL https://bun.sh/install | bash

  # Might need to re-source your shell or place bun in PATH:
  # echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
  # echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc

  info "Installing deno (for WebGPU, etc.)..."
  curl -fsSL https://deno.land/install.sh | sh
  # Similarly, add deno to PATH in your ~/.bashrc or ~/.zshrc

  info "Installing Node.js & npm (if needed for playwright & jupyter)..."
  # Example using NodeSource or nvm - adjust version as you like
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  apt-get install -y nodejs

  info "Installing Playwright test runner..."
  npm install -g @playwright/test
  npx playwright install
  npx playwright install-deps

  info "Installing jupyter..."
  pip install --upgrade pip setuptools
  pip install jupyter
  # or: python3 -m pip install jupyter

  info "Finished installing web tools."
}

### 9. (Optional) Install rclone & configure Google Drive ###

install_rclone() {
  info "Installing rclone for Google Drive integration..."
  curl https://rclone.org/install.sh | bash

  info "Run 'rclone config' to set up Google Drive. Then you can do things like:"
  info "  rclone copy /path/to/recordings gdrive:my-screen-recordings"
}

### 10. Setting up screen capture & storing in GDrive ###

# This is a conceptual example. You might prefer to run a Docker container
# with ffmpeg that captures the X11 display or Wayland session, or use
# something like X11VNC, or a combination of a container + LiveKit to stream
# the display. Then use rclone to upload recordings to Google Drive.
#
# We'll show a placeholder function with a basic ffmpeg capture snippet.

setup_screen_capture() {
  info "Setting up screen capture to LiveKit & saving to GDrive (conceptual)..."

  # Pseudocode / example snippet:
  # 1) Start a LiveKit session to share the screen.
  #    You could run a container that uses a virtual webcam (v4l2loopback)
  #    or a headless X server, but that’s OS/hardware-specific.
  #
  # 2) Record the screen with ffmpeg (or obs):
  #    ffmpeg -video_size 1920x1080 -framerate 30 -f x11grab -i :0.0 output.mkv
  #
  # 3) Use rclone to sync that file to your Google Drive:
  #    rclone copy output.mkv gdrive:my-screen-recordings
  #
  # 4) Possibly run these steps in a background systemd service or a Docker container.
  #
  # Because each Jetson device might be headless, you’ll need to adapt
  # to how you run your X server or Wayland session, or embed the ffmpeg
  # command in a container with the right environment variables.

  info "Configure your screen capture + rclone in a systemd service or Docker container for a persistent setup."
}


### 11. Additional example: set up a local webserver with Caddy & porkbun ###

setup_webserver() {
  info "Installing xcaddy & building with porkbun..."
  go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest

  xcaddy build \
    --with github.com/caddy-dns/porkbun

  info "You can now run ./caddy or configure your Caddyfile, etc."
}

### MAIN INSTALL FUNCTION ###

install_all_deps() {
  check_root
  system_update
  install_basic_utils

  install_docker
  install_nvidia_docker
  setup_jetson_containers

  install_livekit
  install_1password
  install_gh_cli
  install_tailscale

  install_web_tools
  install_rclone

  # Example of the user’s original “homelab” clone:
  # (If you want to keep or adapt it)
  # get_homelab() {
  #   git clone https://github.com/adnanwahab/homelab.git
  #   cd homelab
  # }
  # get_homelab

  setup_screen_capture
  setup_webserver

  info "All dependencies installed! Some tools may require re-logging in or additional steps."
  info "For Tailscale, run: tailscale up"
  info "For rclone, run: rclone config"
  info "Enjoy!"
}

### RUN IT ###

install_all_deps