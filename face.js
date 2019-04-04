class Face {
	constructor (successes, advantages, triumphs, despairs){
		this.successes = successes;
		this.advantages = advantages;
		this.triumphs = triumphs;
		this.despairs = despairs;
	}

	// This is successes/failures with triumphs/despairs.
	get totalSuccessCount(){
		return this.successes + this.triumphs - this.despairs;
	}

	toString(){
		return this.successes + "," + this.advantages + "," + this.triumphs + "," + this.despairs;
	}

	static fromString(val){
		var values = val.split(",");
		return new Face(
			parseInt(values[0], 10),
			parseInt(values[1], 10),
			parseInt(values[2], 10),
			parseInt(values[3], 10));
	}

	static combineFaces(face1, face2){
		var successes = face1.successes + face2.successes;
		var advantages = face1.advantages + face2.advantages;
		var triumphs = face1.triumphs + face2.triumphs;
		var despairs = face1.despairs + face2.despairs;
		return new Face(successes, advantages, triumphs, despairs);
	}
}