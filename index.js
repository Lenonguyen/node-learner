// I'm a child, I'm going to act like a server
// and do nothing else
const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;
/*	const doWork = (duration) => {
	const start = Date.now();
	while(Date.now() - start < duration) {}
} */

app.get('/', (req, res) => {
	const worker = new Worker(function() {
		this.onmessage = function() {
			let counter = 0;
			while (counter < 1e9) {
				counter++;
			}
			postMessage(counter);
		}
	});
	worker.onmessage = function(message) {
		console.log(message.data);
		res.send(' '+message.data);
	}

	worker.postMessage();
	// crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
	// 	res.send('Hi there');
	// });
	//doWork(5000);
});

app.get('/fast', (req, res) => {
	res.send('That was fast!');
});
app.listen(3000);
