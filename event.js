var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('knock', () => {
	console.log('test1');
})

emitter.on('knock', () => {
	console.log('test2');
})

emitter.emit('knock');
