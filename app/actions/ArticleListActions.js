import alt from '../alt';
import ArticleSource from '../sources/ArticleSource';
class ArticleListActions {
	constructor() {

		this.generateActions(

			'onSuccess',
			'onFailure'
		);
	}


	getArticles(page, limit) {

		console.log("ArticleListActions", "getArticles");
		ArticleSource.page(page, limit).then((data) => this.onSuccess(data));

	}
	getMoreArticles(page, limit) {
		return ArticleSource.page(page, limit).then(function(data){
			return data
		});
	}

	getArticlesByHits(page, limit, time) {

		console.log("ArticleListActions", "getArticlesByHits");
		ArticleSource.getArticlesByHits(page, limit,time).then((data) => this.onSuccess(data));

	}
}

export default alt.createActions(ArticleListActions);