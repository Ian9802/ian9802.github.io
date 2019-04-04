function getAllResults(diceList){
	return combiningFunction([new Face(0,0,0,0)], diceList);
}

function combiningFunction(results, diceList){
	if(diceList.length == 0){
		return results;
	}else{
		var faceList = diceList.pop().faceList;
		var nextSet = [];
		for(var i = 0; i < results.length; i++){
			for(var j = 0; j < faceList.length; j++){
				var combined = Face.combineFaces(results[i], faceList[j]);
				nextSet.push(combined);
			}
		}
		return combiningFunction(nextSet, diceList);
	}
}

function toMap(list){
	var map = new Map();
	var faceString;
	var faceCount;
	for(var i = 0; i < list.length; i++){
		faceString = list[i].toString();
		var mapVal = map.get(faceString);
		if(mapVal == null){
			faceCount = 1;
		}else{
			faceCount = mapVal + 1;
		}
		map.set(faceString, faceCount);
	}
	return map;
}

function setOfDivisors(x){
	var divisors = []
	for(var i = 1; i <= Math.max(x/2, 2); i++){
		if(x % i == 0){
			divisors.push(i);
		}
	}
	return divisors;
}

function divides(list, number){
	for(var i = 0; i < list.length; i++){
		if(list[i] % number != 0){
			return false;
		}
	}
	return true;
}

function getGCD(list){
	var divisors = setOfDivisors(list.pop());
	var gcd = 1;
	for(var i = 0; i < divisors.length; i++){
		if(divides(list, divisors[i])){
			gcd = divisors[i];
		}
	}
	return gcd;
}

function reduce(map){
	var gcd = getGCD(Array.from(map.values()));
	var keys = Array.from(map.keys());
	for(var i = 0; i < keys.length; i++){
		map.set(keys[i], map.get(keys[i])/gcd);
	}
	if(gcd > 1){
		reduce(map);
	}
}

function mapToDie(map){
	reduce(map);
	var faceList = [];
	var mapKeys = Array.from(map.keys());
	for(var i = 0; i < mapKeys.length; i++){
		for(var j = 0; j < map.get(mapKeys[i]); j++){
			faceList.push(Face.fromString(mapKeys[i]));
		}
	}
	return new Die(faceList);
}