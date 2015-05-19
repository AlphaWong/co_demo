// Promise version
var async1 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async1');
		resolve(input);
	});
};

var async2 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async2');

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// reject(Error('error callback from sync2'));
		// return reject(Error('error callback from sync2'));
		// throw Error('throw from async2');
		resolve(input);
	});
};

var async3 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async3');
		resolve(input);
	});
};

var delay = function(mil) {
	return new Promise(function(resolve, reject) {
		console.log('delay: '+mil);
		setTimeout(resolve, mil);
	});
};

async1(1).then(function(r1) {
	return delay(2000)
	.then(function() {

		// Parallel Promise-chain
		delay(2000).then(function() {
			console.log('Completed: delay parallel to async2 and async3');
			throw Error('throw from 2nd delay');
		})
		.catch(function(e) {
			console.log('Catched in second chain! ' + e);
		});

		return async2(r1);
	});
}).then(function(r2) {
	return async3(r2)
}).then(function(r3) {
	console.log('Result: ' + r3);
})
.catch(function(e) {
	console.log('Catched in first chain! ' + e);
});

// .then(function() {
// 	return async2(r1);
// })