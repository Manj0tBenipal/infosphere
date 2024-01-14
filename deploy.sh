cd /var/www/infosphere
git checkout master
git pull origin master
npm i
npm run build
pm2 restart infosphere
