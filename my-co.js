'use strict';

module.exports = co;

function co(gen) {
	
	return new Promise(function (resolve, reject) {
		
		var interator = gen();
		var result    = toNext(interator);

		var toFulled = toFulledFactory(resolve, reject)
		toFulled(interator, result)
	})
}

function toFulledFactory(resolve, reject){

	return function toFulled(interator, result){

		if(result.done){return resolve(result.value)}

		if(result && typeof result.then == 'function'){

			result.then((ret) => {
				result = toNext(interator, ret);
				toFulled(interator, result)
			})
		}else{

			result = toNext(interator, result.value);
			toFulled(interator, result)
		}
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

