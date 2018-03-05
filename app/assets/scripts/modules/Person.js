/*jshint esversion: 6 */ 
class Person {
	constructor(fullName, favColor) {
		this.name = fullName;
		this.favoriteColor = favColor;
	}
	
	greet() {
		console.log("Hi , my stats:" + this.name + ", " + this.favoriteColor);
	}
}
// nodejs way of exporting 
// module.exports = Person;

// after installing babel, we can use es6 way
export default Person;
