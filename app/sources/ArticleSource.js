var ArticleSource = {
	page: function(page, limit = 10) {
		return new Promise(function(resolve, reject) {
			var url = "/api/articles"
			$.get(url, {
				"page": page,
				"limit": limit
			}).done(resolve).fail(reject);
		})
	},
	getArticleById: function(id) {
		return new Promise(function(resolve, reject) {
			var url = "/api/article/" + id;
			$.get(url, {}).done(resolve).fail(reject);
		})
	},
	getArticlesByIds: function(ids) {
		return new Promise(function(resolve, reject) {
			if (ids == "") {
				resolve([]);
			} else {
				var url = "/api/articles/ids/" + ids;
				$.get(url, {}).done(resolve).fail(reject);
			}
		})
	},
	setKeyWordsCount(articleId,countArr){
        return new Promise(function(resolve,reject){
			if(articleId==''){
				reject();
			}else{
				var url = "/api/articles/setKeyWordsCount";
				$.post(url,{
					id : articleId,
					arr:countArr
				}).done(resolve).fail(reject);
			}
		})
	},
	getKeyWordsCountJson(artId){
		return new Promise(function(resolve, reject) {
			if (artId == "") {
				resolve([]);
			} else {
				var url = "/api/articles/getKeyWordsCountJson";
				$.get(url, {
					id:artId
				}).done(resolve).fail(reject);
			}
		})
	},
	articleCollect(param){
		return new Promise(function(resolve,reject){
			if(param){
				var url = "/api/articles/setArticleCollect";
				$.post(url,{
					openId:param.openId,
					name:param.name,
					articleId:param.articleId,
					collectDate:param.collectDate,
					articleTitle:param.articleTitle,
					thumbnail:param.thumbnail
				}).done(resolve).fail(reject);
			}else{
				console.log("收藏失败，参数为空");
				reject([]);
			}
		})
	},
	cancelArticleCollect(param){
		return new Promise(function(resolve,reject){
			if(param){
				var url = "/api/articles/cancelArticleCollect";
				$.post(url,{
					openId:param.openId,
					name:param.name,
					articleId:param.articleId,
					thumbnail:param.thumbnail
				}).done(resolve).fail(reject);
			}else{
				console.log("取消收藏失败");
				reject([]);
			}
		})
	}
}

export default ArticleSource;