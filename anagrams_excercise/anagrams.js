let input = ["altered", "education", "scar", "auctioned", 
            "related", "cars", "arcs", "lean"]
let output = []

for(let i=0; i<input.length; i++){
    let toPush =[];
    if(!toPush.includes(input[i])){
        toPush.push(input[i])
    }
    for(let k =0; k<input.length; k++){
        if(k !== i && input[i].length === input[k].length){
            let iCharArray = [];
            let kCharArray = [];
            input[i].split('').forEach(element => {
                iCharArray.push(element)
            });
            iCharArray.sort();
            input[k].split('').forEach(element => {
                kCharArray.push(element)
            });
            kCharArray.sort();
            if(kCharArray.toString() === iCharArray.toString() && !toPush.includes(input[k])){
                toPush.push(input[k])
                input.splice(k, 1)
                k--;
                
            }

        }
    }
    output.push(toPush)
    
}
console.log(output)
