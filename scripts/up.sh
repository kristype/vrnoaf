#!/bin/bash

#cd ~/
#git clone https://github.com/kristianw87/vrnoaf.git
#cd vrnoaf

sudo docker run -itd -v vrnoaf_acme-challenge-volume:/data/letsencrypt -p 80:80 --name acme-challenge kristianw87/vrnoaf-acme-challenge:latest

sudo docker run -it --rm -v vrnoaf_letsencryptetc-volume:/etc/letsencrypt -v vrnoaf_letsencryptlib-volume:/var/lib/letsencrypt -v vrnoaf_acme-challenge-volume:/data/letsencrypt -v vrnoaf_letsencryptlog-volume:/var/log/letsencrypt certbot/certbot certonly --webroot --email kristianw87@gmail.com --agree-tos --no-eff-email --webroot-path=/data/letsencrypt -d vrnoaf.no -d www.vrnoaf.no -d admin.vrnoaf.no -d wp.vrnoaf.no

sudo docker run --rm -it --name dhparam -v vrnoaf_dhparam-volume:/data/dhparam frapsoft/openssl dhparam -out /data/dhparam/dhparam-2048.pem 2048

sudo docker stop acme-challenge
sudo docker rm acme-challenge
sudo docker rmi kristianw87/vrnoaf-acme-challenge

docker-compose -f docker-compose.yml -f docker-compose.production.yml -f docker-compose.ts.yml up -d

echo "0 23 * * * docker run --rm -it --name certbot -v vrnoaf_letsencryptetc-volume:/etc/letsencrypt -v vrnoaf_letsencryptlib-volume:/var/lib/letsencrypt -v vrnoaf_acme-challenge-volume:/data/letsencrypt -v vrnoaf_letsencryptlog-volume:/var/log/letsencrypt certbot/certbot renew --webroot -w /data/letsencrypt --quiet && docker kill --signal=HUP reverseproxy" | crontab -
