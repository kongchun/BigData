var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var read = require('./server/read.js');
var swig = require('swig');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
	var page = swig.renderFile('views/index.html', {
		html: ""
	});
	res.send(page);
});

app.get('/api/articles', function(req, res) {
	var page = parseInt(req.query.page);
	var limit = parseInt(req.query.limit);

	read.articlesByPage(page, limit).then(function(data) {
		res.send(data);
	}).catch(function() {
		res.send([]);
	})
});


app.get('/api/article/:id', function(req, res) {
	var id = parseInt(req.params.id);
	read.articleWithHits(id).then(function(data) {
		res.send(data);
	}).catch(function() {
		res.send([]);
	})
});

app.get('/api/articles/ids/:ids', function(req, res) {
	var ids = req.params.ids.split(",");
	read.articlesByIds(ids).then(function(data) {
		res.send(data);
	}).catch(function() {
		res.send([]);
	})
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});