var log = require('./log');

// Promise version
var async1 = function(input) {
	return new Promise(function(resolve, reject) {
		log('I\'m async function #1');
		resolve(++input);
	});
};

var async2 = function(input) {
	return new Promise(function(resolve, reject) {
		log('I\'m async function #2');

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// reject(Error('error callback from sync2'));
		
		// return reject(Error('error callback from sync2'));
		
		// throw Error('throw from async2');

		///////////////////////
		resolve(++input);
	});
};

var async3 = function(input) {
	return new Promise(function(resolve, reject) {
		log('I\'m async function #3');
		resolve(++input);
	});
};

var delay = function(mil) {
	return new Promise(function(resolve, reject) {
		log('I\'m', mil, 'ms async delay...');
		setTimeout(resolve, mil);
	});
};

async1(0)
	.then(function(r1) {
		return delay(2000)
			.then(function() {
				return async2(r1);
			});
	})
	.then(function(r3) {
		return async3(r3);
	})
	.then(function(r4) {
		log('Result: ' + r4);
	})
	.catch(function(e) {
		log('Catched! ' + e);
	});
