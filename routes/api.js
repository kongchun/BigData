var express = require('express');
var router = express.Router();
var read = require('../server/read.js');

/* GET users listing. */
router.get('/articles', function(req, res) {
	var page = parseInt(req.query.page);
	var limit = parseInt(req.query.limit);

	read.articlesByPage(page, limit).then(function(data) {
		res.send(data);
	}).catch(function(e) {
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

router.post('/articles/setKeyWordsCount', function(req, res) {
	var id = parseInt(req.param('id'));
	var arr = req.body.arr;
	read.setArticleKeyCounts(id, arr).then(function(data) {
		res.send(data);
	}).catch(function(e) {
		res.send([]);
	})
});

router.get('/articles/getKeyWordsCountJson',function(req,res){
	var id = parseInt(req.param('id'));
	read.getKeyWordsCountJson(id).then(function(data) {
		res.send(data);
	}).catch(function() {
		res.send([]);
	})
});
/*
router.get('/hotdot', function(req, res) {
	var page = swig.renderFile('views/index.html', {
		html: ""
	});
	res.send(page);
});*/

module.exports = router;