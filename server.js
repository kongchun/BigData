var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db.js');

var swig = require('swig');

var app = express();

//you won't need 'connect-livereload' if you have livereload plugin for your browser 
//app.use(require('connect-livereload')());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

/*
app.get('/', function(req, res) {
	res.send('Hello World!');
});
*/


app.get('/', function(req, res) {
	var page = swig.renderFile('views/index.html', {
		html: ""
	});
	res.send(page);
});

app.get('/api/articles', function(req, res) {
	var page = parseInt(req.query.page);
	var limit = parseInt(req.query.limit);
	var start = (page - 1) * limit;
	console.log(start, "start");
	var data = [];

	db.open("articles").then(function(collection) {
		return collection.find({
			"delete": null
		}).sort({
			id: -1
		}).skip(start).limit(limit).toArray();
	}).then(function(data) {
		//console.log(data.length, "data");
		db.collection.find().count().then(function(count) {
			db.close();
			res.send({
				limit,
				count,
				page,
				data
			});
		})


	}).catch(function() {
		db.close();
	})
});


app.get('/api/article/:id', function(req, res) {
	var id = parseInt(req.params.id);

	db.open("articles").then(function(collection) {
		return collection.findOne({
			"id": id
		});
	}).then(function(data) {
		db.close();
		res.send(data);
	}).catch(function() {
		res.send([]);
		db.close();
	})
});

app.get('/api/articles/:ids', function(req, res) {
	var ids = req.params.ids.split(",");
	var arr = ids.map((i) => parseInt(i))
	db.open("articles").then(function(collection) {
		return collection.find({
			"id": {
				"$in": arr
			}
		}).toArray();
	}).then(function(data) {
		db.close();
		res.send(data);
	}).catch(function() {
		res.send([]);
		db.close();
	})
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});