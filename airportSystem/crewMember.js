class CrewMember{
    constructor(name, position, staffNumber){

        let paramArray = [name, position, staffNumber];
        for (let i=0;i<paramArray.length; i++)
        {
            if (paramArray[i] == undefined){
                if(i === 0)
                throw new Error(`missing name`)

                if(i === 1)
                throw new Error(`missing position`)

                if(i === 2)
                throw new Error(`missing staff number`)
            }

        }
        this.name = name
        this.position = position
        this.staffNumber = staffNumber

        

    }

}

module.exports = CrewMember