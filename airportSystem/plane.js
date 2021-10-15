const Passenger = require('./passenger')
const CrewMember = require('./crewMember')
const Airport = require('./airport')

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
    fly(from, to){
        if (this.crewMembers.length === 0){
            throw new error('You need a crew to flight');
        }
        // if(from || to != typeof Airport.id){
        //     throw new error('You need to add IDs parameters');
        // }
        return `Plane ${this.type} is leaving from airport: ${from} and landing at airport: ${to}.`
        

    }

}

module.exports = Plane