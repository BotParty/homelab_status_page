#wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
#sudo dpkg -i cloudflared-linux-amd64.deb
#cloudflared tunnel login

#cloudflared tunnel create caddy-tunnel
#cloudflared tunnel route dns caddy-tunnel teach-math.com

#2607:fb90:5e82:4a5d:a18b:e3d3:fb1d:
curl ifconfig.me

dig A cooperative-robotics.com


nslookup cooperative-robotics.com
sudo systemctl status caddy


curl -I https://cooperative-robotics.com

journalctl -u caddy --follow


echo | openssl s_client -showcerts -servername cooperative-robotics.com -connect cooperative-robotics.com:443
