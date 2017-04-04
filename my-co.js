'use strict';

module.exports = co;

function co(gen) {
	
	return new Promise(function (resolve, reject) {
		
		var interator = isGeneratorFunction(gen) ? gen() : gen;
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

		toPromise(result.value).then((ret) => {
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


function toPromise (value) {
	
	// if function
	if(typeof value == 'function'){
		return funToPromise(value)
	}
	// if object
	// if array
	// if generator 
	if(typeof value.next == 'function'){
		return co(value);
	}
	// if promise
	if(typeof value == 'promise'){
		return valie;
	}
	// if normal
	return Promise.resolve(value);
}




function funToPromise (fun) {
	return new Promise((resolve, reject) => {
		fun((error, result) => {
			if(error) return reject(error);
			resolve(result);
		});
	})
}

function isGeneratorFunction(obj) {
	var constructor = obj.constructor;
	if (!constructor) return false;
	if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
}
