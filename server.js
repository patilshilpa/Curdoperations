const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb');
const whatwg = require('whatwg-fetch')
const URL = 'mongodb://localhost:27017/mydatabase'
	var db;

// using the body-parser to read the form data 
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.post('/quotes', function(req,res){
	console.log("hi",req.body);
	db.collection('users').save(req.body, function(error,result){
		   if (error) return console.log(error);
		   console.log('saved to database');
		   res.redirect('/');
	})
});


app.get('/', (req, res) => {
	db.collection('users').find().toArray(function(err, results) {
  	console.log(results);
	 res.render('index.ejs', {users: results})
});
});

 // fetch and update request 
app.put('/quotes', (req, res) => {
	console.log("hi coming inside");
  db.collection('users')
  .findOneAndUpdate({_id:"589aa78fd599343bee5ce90b"}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
    console.log("result",result);
  })
})


app.delete('/quotes', (req, res) => {
  db.collection('users').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send(' quote got deleted')
  })
})


//connect to mongodb 
MongoClient.connect(URL, function(err,database){
	if(err){
		console.log("error in connect to db");
	}else{
	  //	const collection = db .collection ('users')
	   db = database;
	}
});






// create the server to listen 
app.listen(3000, function(){
	console.log('listing to the server 3000');
});

