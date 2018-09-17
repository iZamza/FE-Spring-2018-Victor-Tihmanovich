const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = require('./users.json')

app.use(bodyParser.json());

app.get('/users', function (req, res) {
	res.set('Content-Type', 'application/json');
    let result = users.forEach(user => user += "<br/>")
    res.send(result);
});

app.get('/users/:id', (req, res) => {
	res.set('Content-Type', 'application/json');
	const result = users.find(user => user.id == req.params.id);
	if(result === undefined){
		res.send("Sorry, not users with such Id");
	}else{
	res.send(result);
	}
});

/*
app.post('/users/add', (req, res) =>{
	res.
})

app.put('/users/:id', (req, res) =>{
	res.
})

app.delete('/users/:id', (req, res) =>{
	res.


	for(let i = 0; i < users.length; i++){
    	if(users[i].id == req.params.id){
    		res.send(users[i]);
    	}else{
    		res.send("sorry");
    	}
    }
})*/

app.listen(8888);