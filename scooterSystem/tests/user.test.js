const User = require("../src/user")

describe("User class", () => {
    beforeAll(()=> {
        user1 = new User('Alfo', '1991-04-03', 4444333322221111, 1022, 333)
    })

    test('user1 has a name', () => {
        expect(user1.name).toBe('Alfo')
    })

    test('user1 has a card with expiry date to be 1022', () => {
        expect(user1.cardDetails['Expiry date']).toBe(1022)
    })

    test('card cannot be a string', () => {
        expect(() => new User('Alfo', '1991-04-03', '4444333322221111', 1022, 333))
        .toThrowError('Card must be a Visa or Mastercard, made of 16 digits')
    })

    test('card number must be of 16 digits', () => {
        expect(() => new User('Alfo', '1991-04-03', 444555645453432, 1022, 333))
        .toThrowError('Card must be a Visa or Mastercard, made of 16 digits')
    })

    test('expiry date must be of 4 digits', () => {
        expect(() => new User('Alfo', '1991-04-03', 4444333322221111, 122, 333))
        .toThrowError('Expiry Date must be in the format: MMYY')
    })

    test('expiry date cannot be a string', () => {
        expect(() => new User('Alfo', '1991-04-03', 4444333322221111, '1022', 333))
        .toThrowError('Expiry Date must be in the format: MMYY')
    })

    test('cvc must be of 3 digits', () => {
        expect(() => new User('Alfo', '1991-04-03', 4444333322221111, 1022, 4444))
        .toThrowError('CVC must be of 3 digits only')
    })

    test('cvc cannot be a string', () => {
        expect(() => new User('Alfo', '1991-04-03', 4444333322221111, 1022, '333'))
        .toThrowError('CVC must be of 3 digits only')
    })

    test('user has an object called proof of identity', () => {
        expect(user1).toEqual(expect.objectContaining(
            {
                "name":"Alfo",
                "dob" : "1991-04-03",
                "cardDetails" : {
                    'Card number' : 4444333322221111,
                    'Expiry date': 1022,
                    'CVC' : 333
                },
                "proofOfIdentity" : {},                
            }));
    })


})