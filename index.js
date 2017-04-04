'use strict';

// var co = require('./co');
var http = require('http');

function* test(){

	var result = yield done => {
		http.get('http://www.baidu.com', (result) => {
			done(null, result);
		})
	}
	console.log(result);

	var a = yield true;
	console.log(a);

	var b = yield 1;
	console.log(b)

	return 2;
}



console.log(typeof test);
console.log(typeof test());

co(test).then(val => {console.log(val)})



var a = 1;
function testC(){

	console.log(a);
	const a = 1;
	console.log(a);
}


// testC();



function co(gen) {
	
	return new Promise(function (resolve, reject) {
		
		var interator = gen();
		var result    = toNext(interator);

		toFulled(interator, result, resolve, reject)
	})
}


function toFulled(interator, result, resolve, reject){

	if(result.done){return resolve(result.value)}

	if(result && typeof result.then == 'function'){
		result.then((ret) => {
			result = toNext(interator, ret);
			toFulled(interator, result, resolve, reject)
		})
	}else{
		result = toNext(interator, result.value);
		toFulled(interator, result, resolve, reject)
	}
}


function toNext (interator, value) {
	
	var result = interator.next(value);
	if(typeof result.value == 'function'){
		return funToPromise(result.value)
	}
	return result;
}



function funToPromise (fun) {
	return new Promise((resolve, reject) => {
		fun((error, result) => {
			if(error) reject(error);
			if(result) resolve(result);
		});
	})
}


