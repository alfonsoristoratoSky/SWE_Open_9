const Bag = require('./bag')

class Person{
    constructor(name){
        if(name == undefined){
            throw new Error(`missing name`)
        }                
        else{
            this.name = name;
        } 
        this.bags = []
    }
    addBag(bag){
        if (typeof bag != typeof new Bag(10) ) {
            throw new Error(`must be an instance of bag`)
        }
        else this.bags.push(bag);
        if (bag.weight > 22) {
            throw new Error('Needs to pay extra')
        }
    }
}

module.exports = Person