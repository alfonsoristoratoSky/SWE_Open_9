let firstGen = [
    {
        name: 'King George VI',
        parents: [],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Queen Elizabeth',
        parents: [],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
]

let secondGen = [
    {
        name: 'Prince Phillip',
        parents: [],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Queen Elizabeth II',
        parents: [firstGen[0].name, firstGen[1].name],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Princess Margaret',
        parents: [firstGen[0].name, firstGen[1].name],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
]

let thirdGen = [
    {
        name: 'Camilla',
        parents: [],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Charles',
        parents: [secondGen[0].name, secondGen[1].name],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Diana',
        parents: [],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Anne',
        parents: [secondGen[0].name, secondGen[1].name],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Prince Andrew',
        parents: [secondGen[0].name, secondGen[1].name],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
    {
        name: 'Prince Edward',
        parents: [secondGen[0].name, secondGen[1].name],
        childOf: function() {
            if (this.parents.length < 1) return "unknown"
            else return `${this.parents[0]} & ${this.parents[1]}` 
        }
    },
]

console.log(secondGen[2].childOf())