class Plane{
    constructor(type){

        if (type == undefined) {
            throw new Error(`missing type`)
        }
        this.type = type       
        this.passengers =[]
        this.crewMembers = []
    }
    
    board(passenger){
        this.passengers.push(passenger)
    }
    boardCrew(crewMember){
        this.crewMembers.push(crewMember)
    }

}

module.exports = Plane