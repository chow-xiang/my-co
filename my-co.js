'use strict';

module.exports = co;

function co(gen) {
	
	return new Promise(function (resolve, reject) {
		
		var interator = gen();
		var result = interator.next();

		var toFulled = toFulledFactory(resolve, reject)
		toFulled(interator, result);

		// thunk函数的区别
		// toFulled(interator, result, resolve, reject);
	})
}

function toFulledFactory(resolve, reject){

	return function toFulled(interator, result){

		if(result.done) {return resolve(result.value)}
		
		toPromise(result).then((ret) => {
			toFulled(interator, interator.next(ret))
		})
	}
}


// function toFulled(interator, result, resolve, reject){

// 	if(result.done) {return resolve(result.value)}
// 	result = toPromise(result);

// 	result.then((ret) => {
// 		toFulled(interator, interator.next(ret), resolve, reject)
// 	})
// }


function toPromise (result) {
	
	if(typeof result.value == 'function'){
		return funToPromise(result.value)
	}
	return Promise.resolve(result.value);
}




function funToPromise (fun) {
	return new Promise((resolve, reject) => {
		fun((error, result) => {
			if(error) return reject(error);
			resolve(result);
		});
	})
}

