const Person = require('./person')

class User extends Person{
    constructor(name,dob, cardNumber, expiryDate, cvc){
        super(name, dob)
        
        if (cardNumber.toString().length != 16 || typeof cardNumber !== 'number'){
            throw new Error ('Card must be a Visa or Mastercard, made of 16 digits')
        }

        if (expiryDate.toString().length != 4 || typeof expiryDate !== 'number'){
            throw new Error ('Expiry Date must be in the format: MMYY')
        }

        if (cvc.toString().length != 3 || typeof cvc !== 'number'){
            throw new Error ('CVC must be of 3 digits only')
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
