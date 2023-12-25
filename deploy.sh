cd /var/www/infosphere
git checkout master
git pull origin master
npm run build
pm2 restart infosphere
