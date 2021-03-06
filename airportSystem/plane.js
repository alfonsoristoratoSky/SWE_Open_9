const Passenger = require('./passenger')
const CrewMember = require('./crewMember')

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
        if (typeof passenger != typeof new Passenger('Alfonso', 'aa1212', '1a') ) {
            throw new Error(`must be an instance of Passenger`)
        }
        else this.passengers.push(passenger);
    }
    boardCrew(crewMember){
        if (typeof crewMember != typeof new CrewMember('Mark', 'Captain', 10) ) {
            throw new Error(`must be an instance of CrewMember`)
        }
        else this.crewMembers.push(crewMember);
    }

    // tested in airport.tests.js
    fly(){
        if (this.crewMembers.length === 0){
            throw new Error('You need a crew to flight');
        }
        return `Plane ${this.type} is`
        
        

    }

}

module.exports = Plane