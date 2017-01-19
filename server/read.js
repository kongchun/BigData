var db = require('./db.js');

exports.articlesByPage = function(page, limit) {
	var start = (page - 1) * limit;
	return db.open("articles").then(function(collection) {
		return collection.find({
			"delete": null
		}).sort({
			id: -1
		}).skip(start).limit(limit).toArray();
	}).then(function(data) {
		//console.log(data.length, "data");
		return db.collection.find().count().then(function(count) {
			db.close();
			return ({
				limit,
				count,
				page,
				data
			});
		})
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.article = function(id) {
	return db.open("articles").then(function(collection) {
		return collection.findOne({
			"id": id
		});
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.articleWithHits = function(id) {
	return db.open("articles").then(function(collection) {
		return collection.findOne({
			"id": id
		});
	}).then(function(data) {
		let hits = parseInt(data.hits) + 1;
		let id = parseInt(data.id);
		data.hits = hits;
		return db.collection.updateOne({
			'id': id
		}, {
			'$set': {
				'hits': hits
			}
		}).then(function() {
			db.close();
			return (data);
		})
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}


exports.articlesByIds = function(ids) {
	db.close();
	var arr = ids.map((i) => parseInt(i))
	return db.open("articles").then(function(collection) {
		return collection.find({
			"id": {
				"$in": arr
			}
		}).toArray();
	}).then(function(data) {
		db.close();
		return (data);
	}).catch(function() {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.setArticleKeyCounts = function(id,arr) {
	db.close();
	return db.open("word_relation").then(function(collection) {
		return collection.findOne({
			"id": id
		});
	}).then(function(data) {
		//���ص��������߼��жϲ���1
		var keyWord = data.keyword;
		if(arr!=null && arr!=undefined){
		  for(var key in arr){
			  if(arr[key]>0){
				  var kwCount = keyWord[key];
				  kwCount = kwCount + 1;
				  keyWord[key] = kwCount;
			  }
		  }
		}
		//update����
		return db.collection.update({
			"id":id
		},{
			$set:{
			"keyword":keyWord
		}
		}).then(function() {
			db.close();
			return;
		})
	}).catch(function() {
		db.close();
		console.error(error)
		throw error;
	})
}
//��ȡ�ؼ���Ȩ��
exports.getKeyWordsCountJson = function(id) {
	db.close();
	return db.open("word_relation").then(function(collection) {
		return collection.findOne({
			"id": id
		});
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}
exports.getHotdotsData = function() {
	db.close();
	return db.open("keyword_sort").then(function(collection) {
		return collection.find({}).sort({
			"id":-1
		}).limit(8).toArray();
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.setUserData = function(userinfo) {
	db.close();
	return db.open("users").then(function(collection) {
		return collection.insert(userinfo)
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.getUserData = function(openid) {
	db.close();
	return db.open("users").then(function(collection) {
		return collection.find({"openid":openid}).toArray();
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.userData = function(userinfo) {
	db.close();
	return db.open("users").then(function(collection) {
		console.log("user:" + userinfo.openid)
		return collection.find({"openid":userinfo.openid}).toArray();
	}).then(function(data) {
		if(data.length < 1){
			userinfo['collect'] = [];
			userinfo['marking'] = {};
			return db.collection.insert(userinfo).then(function(){
				db.close();
				return;
			});
		}else{
			db.close();
			return ;
		}
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

//收藏
exports.setArticleCollect = function(openId,name,articleId,collectDate,articleTitle){
	db.close();
	return db.open('users').then(function(collection){
		return collection.findOne({
			'openid':openId
		});
	}).then(function(data){
		if(data){
			var hasCollect = false;
			for(var i in data.collect){
				if(data.collect[i].articleId == articleId){
					hasCollect = true;
					break;
				}
			}
			if(!hasCollect){
				var collect = {
					"articleId" : articleId,
					"collectTime" : collectDate,
					"articleTitle" : articleTitle
				}
				data.collect.push(collect);
				var newCollect = data.collect;
				return db.collection.updateOne({
					'openid':openId,
				},{
					$set:{
						'collect':newCollect
					}
				}).then(function(data){
					db.close();
					return data;
				});
			}


		}else{
			return db.collection.insert({
				"openid":openId,
				"name" : name,
				"type" : 0,
				"collect" : [
					{
						"articleId" : articleId,
						"collectTime" : collectDate,
						"articleTitle" : articleTitle
					}
				],
				"marking" : {}
			}).then(function(data){
				db.close();
				return data;
			})
		}
	}).catch(function(error){
		db.close();
		console.error(error)
		throw error;
	})
}
//取消收藏
exports.cancelArticleCollect = function(openId,name,articleId){
	db.close();
	return db.open("users").then(function(collection){
		return collection.findOne({
			'openid':openId
		});
	}).then(function(data){
		var hasCollect = false;
		var index = 0;
		for(var i in data.collect){
			if(data.collect[i].articleId == articleId){
				hasCollect = true;
				index  = i;
				break;
			}
		}
		if(hasCollect){
			data.collect.splice(index,1);
		}
		var newCollect = data.collect;
		return db.collection.updateOne({
			'openid':openId
		},{
			$set:{
				'collect':newCollect
			}
		}).then(function(data){
			db.close();
			return data;
		}).catch(function(error){
			db.close();
			console.error(error);
			throw error;
		});
	})
}