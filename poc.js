var co = require('co');

var p = getValue();

p()
	.then( (value) => {
		console.log(value);
	})
	.catch( (e) => {
		console.log(e);
	});

function getValue() {
	return co.wrap(function*() {
		var i = yield getPromise1();
		var j = yield getPromise2(i);
		var k = yield getPromise2(j);
		return k;
	});
}

function getPromise1() {
	var promise1 = new Promise((resolve,reject) => {
		setTimeout(() => {
			resolve(123);
		}, 1000);
	});

	return promise1;
}

function getPromise2(value) {
	var promise2 = new Promise((resolve,reject) => {
		setTimeout(() => {
			reject({
				"error": 123
			});
			resolve(value+1);
		}, 1000);
	});

	return promise2;
}

