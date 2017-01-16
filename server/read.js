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
		//返回的数据做逻辑判断并加1
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
		//update数据
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
//获取关键字权重
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
//收藏
exports.setArticleCollect = function(name,articleId){
    db.close();
	return db.open('users').then(function(collection){
		return collection.findOne({
			'name':name
		});
	}).then(function(data){
		if(data){
			if(data.collect.indexOf(articleId)<0){
				data.collect.push(articleId);
			}
			var newCollect = data.collect;
			return db.collection.updateOne({
				'name':name,
			},{
				$set:{
					'collect':newCollect
				}
			}).then(function(data){
				db.close();
				return data;
			});
		}else{
            return db.collection.insert({
				"name" : name,
				"type" : 2,
				"collect" : [
					articleId
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
exports.cancelArticleCollect = function(name,articleId){
	db.close();
    return db.open("users").then(function(collection){
		return collection.findOne({
			'name':name
		});
	}).then(function(data){
		var index = data.collect.indexOf(articleId);
		if(index > -1){
			data.collect.splice(index,1);
		}
		var newCollect = data.collect;
		return db.collection.updateOne({
			'name':name
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
//获取用户收藏文章信息
exports.getArticleByUser = function(name,articleId){
	db.close();
	return db.open("users").then(function(collection){
		return collection.findOne({
			'name':name
		});
	}).then(function(data){
	    db.close();
		return data;
	}).catch(function(error){
		db.close();
		console.error(error);
		throw error;
	})
}

