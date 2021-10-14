class Bag{
    constructor(weight){
        
        if (weight == undefined || typeof weight != 'number'){
            throw new Error('bag must have a numerical weight')
        }

        else {
            this.weight = weight
        }
    }

    isOverLimit() {
        if (this.weight > 20) return true
    }

}


module.exports = Bag