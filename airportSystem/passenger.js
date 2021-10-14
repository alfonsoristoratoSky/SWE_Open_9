const Bag = require('./bag')

class Passenger{
    constructor(name, passportNumber, seatNumber){

        let paramArray = [name, passportNumber, seatNumber];
        for (let i=0;i<paramArray.length; i++)
        {
            if (paramArray[i] == undefined){
                if(i === 0)
                throw new Error(`missing name`)

                if(i === 1)
                throw new Error(`missing passport number`)

                if(i === 2)
                throw new Error(`missing seat number`)
            }

        }
        this.name = name
        this.passportNumber = passportNumber
        this.seatNumber = seatNumber

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

module.exports = Passenger
