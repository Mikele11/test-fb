var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('myelekenchat', ['myelekenchat']);
const MongoClient = require('mongodb').MongoClient;

//const MONGO_URL = 'mongodb://Mikele11:face112358@ds153413.mlab.com:53413/bookday';
const MONGO_URL = 'mongodb://Mikele11:face112358@ds133621.mlab.com:33621/myelekenchat';

MongoClient.connect(MONGO_URL, function(err, db){  
  if (err) {
    return console.log(err);
  }
	//var db = client.db('mytestingdb');  
	app.get('/myelekenchat', function (req, res) {
		db.collection("myelekenchat").find({}).toArray(function(error, doc) {
			if (err) throw error;
			res.send(doc);
			//db.close();
		});
	});

	app.post('/myelekenchat', function (req, res) {
	  db.collection("myelekenchat").insertOne(req.body, function(err, doc) {
		if (err) throw err;
		res.json(doc);
		//db.close();
	  });
	});
	
	app.delete('/myelekenchat/:id', function (req, res) {
	  var id = req.params.id;
	  console.log(id);
	  db.collection("myelekenchat").remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
		//db.close();
	  });
	});
		
});


var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Server running on port 3000");
