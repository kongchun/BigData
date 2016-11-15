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
	var arr = ids.map((i) => parseInt(i))
	return db.open("articles").then(function(collection) {
		return collection.find({
			"id": {
				"$in": arr
			}
		}).toArray();
	}).then(function(data) {
		return (data);
	}).catch(function() {
		db.close();
		console.error(error)
		throw error;
	})
}