'use strict';

// var co = require('./co');

var co = require('./my-co');
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


	for(var i=0;i<20000;i++){
		// var index = yield done => {result.value
		// 	done(null, i);
		// }
		var index = yield i;
		console.log(index);
	}

	return 2;
}



console.log(typeof test);
console.log(typeof test());

co(test).then(val => {console.log(val)})



// var a = 1;
// function testC(){

// 	console.log(a);
// 	const a = 1;
// 	console.log(a);
// }

// testC();




