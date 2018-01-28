npm install
npm install --only=dev
npm run build

cp -TR ./dist/ ../wwwroot/dist/
cp -R ./index.html ../wwwroot/index.html
cp -R ./server.js ../wwwroot/server.js
cp -R ./package.json ../wwwroot/package.json

cd ../wwwroot
npm install --only=production
