var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var data = require('./data.js')

var app = express();

app.use(bodyParser.json());

app.get('/api/data', function(req, res, next){
	let q = req.query;

	var filteredData = data.filter( function(obj) {
		for(var key in q){
			if(obj[key] !== q[key]){
				return false;
			}
		}
		return true;
	})

	res.status(200).json(filteredData);
})

app.get('/api/data/:id', function(req, res, next){
	let id = req.params.id;
	res.status(200).json(data[id]);
})



app.post('/api/data', function(req, res, next){
	let person = req.body;
	data.push(person);
	res.status(200).send('ok');
})

app.delete('/api/data/:id', function(req, res, next){
	var removed = data.splice(req.params.id, 1);
	res.status(200).send(removed[0])
})

app.put('/api/data/:id', function(req, res, next){
	var i = req.params.id;
	var q = req.query;
	for(var key in q){
		data[i][key] = q[key];
	}

	res.status(200).send(data[i]);
})


app.listen(port, function() {
	console.log('Listening on port',port);
})