var express = require('express');
var router = express.Router();
var read = require('../server/read.js');

/* GET users listing. */
router.get('/articles', function(req, res) {
	var page = parseInt(req.query.page);
	var limit = parseInt(req.query.limit);

	read.articlesByPage(page, limit).then(function(data) {
		res.send(data);
	}).catch(function() {
		res.send([]);
	})
});


router.get('/article/:id', function(req, res) {
	var id = parseInt(req.params.id);
	read.articleWithHits(id).then(function(data) {
		res.send(data);
	}).catch(function() {
		res.send([]);
	})
});

router.get('/articles/ids/:ids', function(req, res) {
	var ids = req.params.ids.split(",");
	read.articlesByIds(ids).then(function(data) {
		res.send(data);
	}).catch(function() {
		res.send([]);
	})
});

module.exports = router;