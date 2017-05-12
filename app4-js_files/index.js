const data = require('./data');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

app.get('/api/data', function(req, res, next){
    res.status(200).json({
        statusCode: 'ok',
        data: data.people
    });
})

app.post('/api/people', function(req, res, next){
    let people = req.body;
    data.people.push(people);
    res.status(200).send('ok');
} )




app.listen(8000, function(){
    console.log('yo');
})