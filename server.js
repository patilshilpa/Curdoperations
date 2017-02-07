const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb');
const URL = 'mongodb://localhost:27017/mydatabase'

var db;

// using the body-parser to read the form data 
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs')





/*app.get('/', function(request,response){
	//console.log("hi coming the get request");
	response.sendFile(__dirname + '/index.html');
	// Note: __dirname is directory that contains the JavaScript source code. 
})*/

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

