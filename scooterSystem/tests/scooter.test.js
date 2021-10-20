const { parse } = require("path/win32");
const Scooter = require("../src/scooter")

describe('Scooter class', () => {
    beforeAll(() => {
        scoot1 = new Scooter();
        scoot2 = new Scooter();
    })
    afterEach(() => {
        jest.useRealTimers();
    })

    test('scoot1 has an id of 1, a battery of 100, is charged, is not locked, is not under maintenance, has a distance travelled of 0', () =>{
        expect(scoot1).toEqual({
            battery: 100,
            distanceTravelled: 0,
            id: 1,
            isLocked: true,
            isUnderMaintenance: false,
            isCharged: true,
            isInUse: false
        })
    })

    test('scoot2 has an id of 2', () =>{
        expect(scoot2.id).toBe(2)
    })


    test('cannot ride a locked scooter, which can only be unlocked via the app', () =>{
        expect(() => new Scooter().ride()).toThrowError('You must unlock scooter via the app before using it')
    })

    // test("ride", () => {
    //     scoot1.isLocked = false;
    //     let interv = setInterval(() => {
    //         scoot1.ride(); // we need to wait for the ride
            
    //         if(scoot1.battery === 95){
                
    //             clearInterval(interv)
                
    //         }

            
    //     },1000)
    //     setTimeout(() => {
    //         expect(scoot1.battery).toBe(95)
    //     },5100)
        
        

    //   });
    
    
    test('ride decreases battery and logs battery  level every second', () => {
        scoot1.isLocked = false;
        jest.useFakeTimers()
        jest.spyOn(global, 'setInterval')
        
        
        
        
        let x = 0;
        while (x<5){
            scoot1.ride();
            x++
        }

        jest.advanceTimersByTime(1000)
        
        expect(setInterval).toHaveBeenCalledTimes(5)
        expect(scoot1.battery).toBe(95)
        expect(scoot1.distanceTravelled).toBe(0.32*5)
        jest.clearAllTimers()

    })

    test('if battery goes to 0, ride stops', () => {
        scoot2.isLocked = false;
        jest.useFakeTimers()
        jest.spyOn(global, 'setInterval')
        jest.spyOn(global, 'clearInterval')
        
        
        
        
        let x = 0;
        while (x<100){
            scoot2.ride();
            x++
        }

        jest.runAllTimers()
        
        expect(setInterval).toHaveBeenCalledTimes(100)
        expect(clearInterval).toHaveBeenCalledTimes(100)
        expect(scoot2.battery).toBe(0)
        expect(parseFloat(scoot2.distanceTravelled.toFixed(2))).toEqual(32)
        

    })
})