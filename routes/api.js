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
	var id = req.params.id;
	read.articleWithHits(id).then(function(data) {
		read.addArticleWithHits(data).then(function(){
			if(req.cookies["userinfo"] && req.cookies["userinfo"] != ""){
				let openid = JSON.parse(req.cookies["userinfo"]).openid;
				read.recordLog({
					"openid":openid,
					"action":1,
					"artid":id,
					"time":new Date()
				})
			}
		})
		if(id && id != ""){
			if(!req.cookies["articles"]){
				let articles = new Set();
				articles.add(id)
				res.cookie("articles", JSON.stringify([...articles]),{maxAge:86400000})
			}else{
				let articles = new Set(JSON.parse(req.cookies["articles"]));
				articles.add(id)
				res.cookie("articles", JSON.stringify([...articles]),{maxAge:86400000})
			}
		}
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
	var openid = req.query.openid;
	console.log(openid);
	read.getUserData(openid).then(function(data){
		if(data && data.length > 0){
			res.send(data);
		}else{
			var timestamp = Date.parse(new Date()).toString();
			var newUser = {
				"openid":timestamp,
				"nickname" : '',
				"type" : 0,
				"collect" : [],
				"marking" : {},
				"sex": 1,
				"languag": 'zh_CN',
				"city": '苏州',
				"province": '江苏',
				"country": '中国',
				"headimgurl": "",
				"privilege": []
			}
			read.setUserData(newUser).then(function(data){
				res.cookie("userinfo", JSON.stringify(newUser))
				read.recordLog({
					"openid":newUser.openid,
					"action":0,
					'time':new Date()
				})
				res.send([newUser]);
			})
		}
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
	var thumbnail = req.body.thumbnail;
	read.setArticleCollect(openId,name,articleId,collectDate,articleTitle,thumbnail).then(function(data){
		read.recordLog({
			"openid":openId,
			"action":2,
			"artid":articleId,
			"title":articleTitle,
			"time":new Date()
		})
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
	var thumbnail = req.body.thumbnail;
	read.cancelArticleCollect(openId,name,articleId,thumbnail).then(function(data){
		read.recordLog({
			"openid":openId,
			"action":3,
			"artid":articleId,
			"time":new Date()
		})
		res.send(data);
	}).catch(function(e){
		res.send([]);
	})
});
module.exports = router;