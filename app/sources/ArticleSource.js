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
			var url = "/api/articles/" + ids;
			$.get(url, {}).done(resolve).fail(reject);
		})
	}
}

export default ArticleSource