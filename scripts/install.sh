# dependencies
#
# 1. docker setup - nvidia docker runtie
# 2. jetson containers - 2 orin devkits + 1 jetson nano
# 3. livekit self-hosted
# 4. one password cli
# 5. gh cli
# 6. tailscale
# 7. bun.sh + deno2 for webGPU + jupyter to observablehq integration
# https://playwright.dev/docs/api/class-playwright

setup_virtualization(){
    sudo apt update
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
sudo usermod -aG libvirt $USER
virt-manager

} 


setup_webserver() {
    curl -fsSL https://ollama.com/install.sh | sh
    go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest

    # Build Caddy with the porkbun module
    # xcaddy build \
    #     --with github.com/caddy-dns/porkbun
    mkdir ~/caddy-build
    cd ~/caddy-build
    go mod init caddy-build

     xcaddy build v2.8.4   --with github.com/caddy-dns/cloudflare   --with github.com/caddy-dns/porkbun   --with github.com/tailscale/caddy-tailscale
     sudo mv ./caddy /usr/local/bin/caddy
    sudo chmod +x /usr/local/bin/caddy

}

setup_agent_deps() {
    curl -fsSL https://bun.sh/install | bash
    npm install @playwright/test                                              ║
    npx playwright install    
    sudo npx playwright install-deps  
}

install_tailscale() {
    curl -fsSL https://tailscale.com/install.sh | sh
}

get_homelab() {
    git clone https://github.com/adnanwahab/homelab.git
    cd homelab
}

install_1password() {
    # Check if 1password-cli is already installed
    if command -v op >/dev/null 2>&1; then
        echo "1Password CLI is already installed"
        return 0
    fi

    # Install 1password-cli if not present
    curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
        sudo gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg && \
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/$(dpkg --print-architecture) stable main" | \
        sudo tee /etc/apt/sources.list.d/1password.list && \
        sudo mkdir -p /etc/debsig/policies/AC2D62742012EA22/ && \
        curl -sS https://downloads.1password.com/linux/debian/debsig/1password.pol | \
        sudo tee /etc/debsig/policies/AC2D62742012EA22/1password.pol && \
        sudo mkdir -p /usr/share/debsig/keyrings/AC2D62742012EA22 && \
        curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
        sudo gpg --dearmor --output /usr/share/debsig/keyrings/AC2D62742012EA22/debsig.gpg && \
        sudo apt update && sudo apt install 1password-cli
}
# docker compose up -dWw


# tailscale
# adnan@gpu
# adnan@ll-series



install_all_deps() {
    install_1password
}


install_all_deps()
