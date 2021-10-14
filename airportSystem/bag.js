class Bag{
    constructor(weight){
        
        if (weight == undefined){
            throw new Error('bag must have weight')
        }
        else {
            this.weight = weight
        }
    }

    isOverLimit(_weight) {
        if (this.weight > 20) return true
    }

}


module.exports = Bag