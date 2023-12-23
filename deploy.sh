git checkout master
git pull origin master
npm run build --update-env
pm2 restart infosphere
