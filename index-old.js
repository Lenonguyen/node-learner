process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
	// Cause index.js to be executed *again* but
	// in child mode
	cluster.fork();
} else {
	// I'm a child, I'm going to act like a server
	// and do nothing else
	const express = require('express');
	const crypto = require('crypto');
	const app = express();

/*	const doWork = (duration) => {
		const start = Date.now();
		while(Date.now() - start < duration) {}
	} */

	app.get('/', (req, res) => {
		crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
		     res.send('Hi there');
		});
		//doWork(5000);
	});

	app.get('/fast', (req, res) => {
		res.send('That was fast!');
	});
	app.listen(3000);

}
