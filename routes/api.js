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

router.get('/hotdots', function(req, res) {
	read.getHotdotsData().then(function(data){
		res.send(data);
	}).catch(function(){
		res.send([]);
	})
});
router.get('/user', function(req, res) {
	var openid = parseInt(req.query.openid);
	read.getUserData(openid).then(function(data){
		res.send(data);
	}).catch(function(){
		res.send([]);
	})
});
//收藏文章
router.post('/articles/setArticleCollect', function(req, res) {
	var openId = req.body.openId;
	var name = req.body.name;
	var articleId = req.body.articleId;
	var collectDate = req.body.collectDate;
	var articleTitle = req.body.articleTitle;
	read.setArticleCollect(openId,name,articleId,collectDate,articleTitle).then(function(data){
		res.send(data);
	}).catch(function(e){
		res.send([]);
	})
});
//取消收藏
router.post('/articles/cancelArticleCollect', function(req, res) {
	var openId = req.body.openId;
	var name = req.body.name;
	var articleId = req.body.articleId;
	read.cancelArticleCollect(openId,name,articleId).then(function(data){
		res.send(data);
	}).catch(function(e){
		res.send([]);
	})
});
router.get('/articles/getArticleByUser', function(req, res) {
	var openId = req.query.openId;
	read.getArticleByUser(openId).then(function(data){
		res.send(data);
	}).catch(function(e){
		res.send([]);
	})
});
module.exports = router;