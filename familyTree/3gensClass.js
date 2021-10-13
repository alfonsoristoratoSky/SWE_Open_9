class Person {
    constructor(name, parents){
        this.name = name,
        this.parents = parents
    };

    childOf () {
        if (this.parents.length < 1) return "unknown"
        else return `${this.parents[0]} & ${this.parents[1]}` 
    
    }
}

let firstGen = [];
let secondGen = [];
let thirdGen = [];

firstGen.push(
    new Person('King Geroge VI', []), 
    new Person('Queen Elizabeth', [])
    );

secondGen.push(
    new Person('Prince Philip', []), 
    new Person('Queen Elizabeth  II', [firstGen[0].name, firstGen[1].name]), 
    new Person('Princess Margaret', [firstGen[0].name, firstGen[1].name])
    );

thirdGen.push(
    new Person('Camilla', []), 
    new Person('Diana', []), 
    new Person('Charles', [secondGen[0].name, secondGen[1].name]), 
    new Person('Anne', [secondGen[0].name, secondGen[1].name]), 
    new Person('Prince Andrew', [secondGen[0].name, secondGen[1].name]), 
    new Person('Prince Edward', [secondGen[0].name, secondGen[1].name]), 
    );

// console.log(secondGen[1].childOf())

module.exports = {
    firstGen,
    secondGen,
    thirdGen,
    Person
};
