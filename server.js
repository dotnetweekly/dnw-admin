const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const isProd = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
let renderer;

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');

if (isProd) {
	app.use('/', express.static(path.resolve(__dirname, './dist')));
} else {
	app.use('/dist', express.static(path.resolve(__dirname, './dist')));
}

if (!isProd) {
	require('./build/dev-server')(app, (bundle) => {});
}

app.get('*', (req, res) => {
	res.write(html);
	res.end();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
