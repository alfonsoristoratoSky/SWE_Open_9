const Person = require('./person')

class User extends Person{
    constructor(name,dob, cardNumber, expiryDate, cvc){
        super(name, dob)
        
        if (cardNumber == undefined || cardNumber.toString().length != 16 || typeof cardNumber !== 'number'){
            throw new Error ('Card must be a Visa or Mastercard, made of 16 digits')
        }

        if (expiryDate == undefined || expiryDate.length != 4 || typeof expiryDate !== 'string'){
            throw new Error ('Expiry Date must be in the format: MMYY')
        }

        if (cvc == undefined || cvc.length != 3 || typeof cvc != 'string'){
            throw new Error ('CVC must be of 3 digits only')
        }

        // expiry date can't be in the past
        let monthOfExpiry = expiryDate.substring(0,2)
        let yearofExpiry = expiryDate.substring(2)
        let thisMonth = new Date().getMonth()+1
        let thisYear = new Date().getFullYear().toString().substring(2)

        if(yearofExpiry < thisYear || yearofExpiry === thisYear && monthOfExpiry < thisMonth){
            throw new Error ('You need to use a card with a valid expiration date')
        }



        


        
        this.cardDetails = {
            'Card number' : cardNumber,
            'Expiry date': expiryDate,
            'CVC' : cvc
        };

        this.proofOfIdentity = {

        }

    }
}

module.exports = User;
