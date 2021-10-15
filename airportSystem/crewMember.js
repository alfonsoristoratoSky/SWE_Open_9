const Person = require('./person')

class CrewMember extends Person{
    constructor(name, position, staffNumber, bags){
        super(name, bags)

        let paramArray = [position, staffNumber];
        for (let i=0;i<paramArray.length; i++)
        {
            if (paramArray[i] == undefined){
                if(i === 0)
                throw new Error(`missing position`)

                if(i === 1)
                throw new Error(`missing staff number`)
            }

        }
        
        this.position = position
        this.staffNumber = staffNumber

        

    }

}

module.exports = CrewMember