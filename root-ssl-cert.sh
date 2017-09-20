
cd ..

git clone git@github.com:certbot/certbot.git
certbot/certbot-auto certonly --webroot -w /home/7korobi/giji-nuxt/static -d giji.f5.si -m 7korobi@gmail.com --agree-tos

ls -lh /etc/letsencrypt/live/giji.f5.si/