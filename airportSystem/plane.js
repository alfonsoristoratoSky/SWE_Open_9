class Plane{
    constructor(type){

        if (type == undefined) {
            throw new Error(`missing type`)
        }
        this.type = type       
        this.passengers =[]
    }
    
    board(passenger){
        this.passengers.push(passenger)
    }

}

module.exports = Plane