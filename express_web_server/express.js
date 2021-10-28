const express = require('express');
const bodyParser = require('body-parser');

const {Person, thirdGen} = require('../express_web_server/public/gens');

const app = express()
const port = 3001

// //entry point
// app.get('/', (req, res) => {
    
//     res.send(gens.thirdGen)    
    
// })


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/royal/:name', (req, res) => {
    let finalRes = '';
    if(thirdGen.find( e => e.name === req.params.name)){
        finalRes = thirdGen.find( e => e.name === req.params.name)
    }
    else{
        finalRes = `There's no royal with the name ${req.params.name}`
    }

    res.send(finalRes)
    
    
})

app.post('/create', (req,res) => {
    console.log(req.body)
    let obj = new Person(req.body.Name, [req.body.Parent1, req.body.Parent2 ])
    thirdGen.push(obj)
    console.log(thirdGen)
    res.end()
})


app.listen(port)