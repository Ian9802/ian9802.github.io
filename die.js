class Die {
	constructor(faceList){
		this.faceList = faceList;
	}
	static createBoost(){
		var faceList = [];
		faceList.push(new Face(0,1,0,0));
		faceList.push(new Face(0,2,0,0));
		faceList.push(new Face(0,0,0,0));
		faceList.push(new Face(1,1,0,0));
		faceList.push(new Face(1,0,0,0));
		faceList.push(new Face(0,0,0,0));
		var boost = new Die(faceList);
		return boost;
	}
	static createAbility(){
		var faceList = [];
		faceList.push(new Face(1,1,0,0));
		faceList.push(new Face(1,0,0,0));
		faceList.push(new Face(0,2,0,0));
		faceList.push(new Face(0,1,0,0));
		faceList.push(new Face(1,0,0,0));
		faceList.push(new Face(0,0,0,0));
		faceList.push(new Face(0,1,0,0));
		faceList.push(new Face(2,0,0,0));
		var ability = new Die(faceList);
		return ability;
	}
	static createProficiency(){
		var faceList = [];
		faceList.push(new Face(1,0,0,0));
		faceList.push(new Face(0,2,0,0));
		faceList.push(new Face(1,1,0,0));
		faceList.push(new Face(1,1,0,0));
		faceList.push(new Face(2,0,0,0));
		faceList.push(new Face(0,0,0,0));
		faceList.push(new Face(0,1,0,0));
		faceList.push(new Face(1,1,0,0));
		faceList.push(new Face(0,2,0,0));
		faceList.push(new Face(1,0,0,0));
		faceList.push(new Face(2,0,0,0));
		faceList.push(new Face(0,0,1,0));
		var proficiency = new Die(faceList);
		return proficiency;
	}

	static createSetback(){
		var faceList = [];
		faceList.push(new Face(0,-1,0,0));
		faceList.push(new Face(-1,0,0,0));
		faceList.push(new Face(0,0,0,0));
		faceList.push(new Face(-1,0,0,0));
		faceList.push(new Face(0,-1,0,0));
		faceList.push(new Face(0,0,0,0));
		var setback = new Die(faceList);
		return setback;
		
	}
	static createDifficulty(){
		var faceList = [];
		faceList.push(new Face(0,-1,0,0));
		faceList.push(new Face(-2,0,0,0));
		faceList.push(new Face(0,0,0,0));
		faceList.push(new Face(0,-2,0,0));
		faceList.push(new Face(0,-1,0,0));
		faceList.push(new Face(-1,-1,0,0));
		faceList.push(new Face(0,-1,0,0));
		faceList.push(new Face(-1,0,0,0));
		var difficulty = new Die(faceList);
		return difficulty;
	}
	static createChallenge(){
		var faceList = [];
		faceList.push(new Face(-1,0,0,0));
		faceList.push(new Face(0,-2,0,0));
		faceList.push(new Face(-1,-1,0,0));
		faceList.push(new Face(-2,0,0,0));
		faceList.push(new Face(0,-1,0,0));
		faceList.push(new Face(0,0,0,0));
		faceList.push(new Face(-1,0,0,0));
		faceList.push(new Face(0,-1,0,0));
		faceList.push(new Face(-2,0,0,0));
		faceList.push(new Face(-1,-1,0,0));
		faceList.push(new Face(0,-2,0,0));
		faceList.push(new Face(0,0,0,1));
		var challenge = new Die(faceList);
		return challenge;
	}

	roll(){
		var min = 0;
		var max = this.faceList.length;
		var value = Math.floor(Math.random() * (max - min) ) + min;
		return this.faceList[value];
	}

	getExpectedX(param){
		var frac = new Fraction(0,0)
		for(var i = 0; i < this.faceList.length; i++){
			frac.add(this.faceList[i][param])
		};
		return frac;
	}

	getExpectedSuccess(){
		return this.getExpectedX("successes");
	}
	getExpectedFailures(){
		var response = this.getExpectedSuccess();
		response.changeSign();
		return response;
	}

	getTotalExpectedSuccess(){
		return this.getExpectedX("totalSuccessCount");
	}

	getExpectedAdvantages(){
		return this.getExpectedX("advantages");
	}
	getExpectedThreats(){
		var response = this.getExpectedAdvantages();
		response.changeSign();
		return response;
	}

	getExpectedTriumphs(){
		return this.getExpectedX("triumphs");
	}

	getExpectedDespairs(){
		return this.getExpectedX("despairs");
	}
}