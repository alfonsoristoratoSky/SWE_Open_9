class Person{
    
    constructor(name, dob){

        if(name == undefined || name == null || name.length < 3){
            throw new Error ('You must insert a name of at least 3 characters')
        }
        else{
            this.name = name;
        }

        if(typeof dob != typeof new Date().toISOString().split('T')[0] || 
            !dob.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)){
            throw new Error ('Date of birth must be in YYYY-MM-DD format')
        }
        else{
            this.dob = new Date(dob).toISOString().split('T')[0];
        }
        
    }    
}

module.exports = Person
