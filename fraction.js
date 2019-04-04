class Fraction {
	constructor (top, bottom) {
		this.top = top;
		this.bottom = bottom;
	}
	add(count){
		this.top += count;
		this.bottom += 1;
	}
	changeSign(){
		this.top *= -1;
	}
	resolve(){
		return this.top/this.bottom;
	}
}