#rm -rf node_modules
npm install
npm install --only=dev

sed -i 's/http:\/\/localhost:3000/https:\/\/dnw-api.azurewebsites.net/g' ./src/config.js
sed -i 's/http:\/\/localhost:5000/https:\/\/www.dotnetweekly.com/g' ./src/config.js
sed -i 's/http:\/\/localhost:6100/https:\/\/dnw-newsletter.azurewebsites.net/g' ./src/config.js

npm run build

cp -TR ./dist/ ../wwwroot/dist/
cp -R ./index.html ../wwwroot/index.html
cp -R ./server.js ../wwwroot/server.js
cp -R ./package.json ../wwwroot/package.json

cd ../wwwroot
#rm -rf node_modules
npm install --only=production
