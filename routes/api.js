var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var service = require('../server/service.js');

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
				let unionid = JSON.parse(req.cookies["userinfo"]).unionid;
				read.recordLog({
					"openid":openid,
					"unionid":unionid,
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

router.get('/articles/keyWords', function(req, res) {
    var wordStr = req.query.words;
	var words = [];
    var limit = 1;
    if(!!wordStr){
        words = wordStr.split(",");
        console.log(words.length);
        console.log(words);
        limit = parseInt(req.query.limit);
    }else{
        res.send([]);
    }

	read.articlesByWords(words, limit).then(function(data) {
		res.send(data);
	}).catch(function(e) {
		res.send([]);
	})
});

router.get('/articles/byHits', function(req, res) {
    var page = parseInt(req.param('page'));
    var limit = parseInt(req.param('limit')) || 7;
    var timeStr = parseInt(req.param('times'));
	service.getArticlesByHits(page,limit,timeStr).then(function(data) {
		res.send(data);
	}).catch(function(e) {
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
	var unionid = req.query.unionid;
	read.getUserData(unionid).then(function(data){
		if(data && data.length > 0){
			res.send(data);
		}else{
			var timestamp = Date.parse(new Date()).toString();
			var newUser = {
				"openid":timestamp,
				"unionid":timestamp,
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
					"unionid":newUser.unionid,
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
	var unionid = req.body.unionid;
	var name = req.body.name;
	var articleId = req.body.articleId;
	var collectDate = req.body.collectDate;
	var articleTitle = req.body.articleTitle;
	var thumbnail = req.body.thumbnail;
	var articleSmartSummary = req.body.articleSmartSummary;
	var tags = req.body.tags;
	read.setArticleCollect(unionid,name,articleId,collectDate,articleTitle,thumbnail,articleSmartSummary,tags).then(function(data){
		read.recordLog({
			"unionid":unionid,
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
	var unionid = req.body.unionid;
	var name = req.body.name;
	var articleId = req.body.articleId;
	var thumbnail = req.body.thumbnail;
	read.cancelArticleCollect(unionid,name,articleId,thumbnail).then(function(data){
		read.recordLog({
			"unionid":unionid,
			"action":3,
			"artid":articleId,
			"time":new Date()
		})
		res.send(data);
	}).catch(function(e){
		res.send([]);
	})
});
router.get('/msg', function(req, res) {
	var msg = req.query.msg;
	service.getSegment(msg).then(function(data) {
        res.send(data);
    }).catch(function(e) {
        res.send([]);
    })
});
router.post('/actionLog',function(req, res){
    var action = req.body.action;
    let openid = '';
    let unionid = '';
    if(req.cookies["userinfo"] && req.cookies["userinfo"] != ""){
        openid = JSON.parse(req.cookies["userinfo"]).openid;
        unionid = JSON.parse(req.cookies["userinfo"]).unionid;
    }
    var actionData = {
        "openid":openid,
        "unionid":unionid,
        "action":action,
        "time":new Date()
    }
    //0.登录微信信息/获取用户信息
    //1.阅读文章
    //2.收藏文章
    //3.取消收藏文章
    //4.查看文章快阅信息
    //5.关键词搜索
    if('6'==action){//链接推广
        actionData.url = req.body.url;
        actionData.from = req.body.from;
        var from = req.body.from;
        if(!!from) actionData.from = from;
        var source = req.body.source;
        if(!!source) actionData.source = source;
    }else if('5' == action){//关键字搜索
        actionData.search = req.body.search;
        actionData.searchKey = req.body.searchKey;
    }else if('1' == action || '4' == action){//阅读文章、阅读文章快阅
        actionData.artid = req.body.artid;
        var title = req.body.title;
        if(!!title) actionData.title = title;
    }
    read.recordLog(actionData);
    res.send('success');
});

module.exports = router;