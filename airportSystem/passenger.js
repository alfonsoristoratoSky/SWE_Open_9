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
        this.bags.push(bag);
    }

}

module.exports = Passenger
