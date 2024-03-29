class Person {
  constructor(name = 'Anonymous', age = 0){
    this.name = name;
    this.age = age
  }
  getGreeting(){
    return `Hi. I am ${this.name}.`
  }
  getDescription(){
    return `${this.name} is ${this.age}`
  }


}

class Student extends Person {
  constructor(name = 'Anonymous', age = 0, major){
    super();
    this.name = name;
    this.age = age
    this.major = major
  }
  hasMajor(){
    return !!this.major
  }
  getDescription(){
    let description = super.getDescription();
    if (this.hasMajor()){
      description += ` Their major is ${this.major}`
    }
    return description;
  }
}

class Traveler extends Person {
  constructor(name = 'Anonymous', age = 0, homeLocation){
    super(name, age);
    this.homeLocation = homeLocation
  }
  getGreeting(){
    let greeting = super.getGreeting();
    if (this.homeLocation) {
      greeting += ` I am from ${this.homeLocation}`
    }
    return greeting;
  }
}


const me = new Traveler("Jeff Witt", 34, 'Folsom');
