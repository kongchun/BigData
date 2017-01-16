import alt from '../alt';
import ArticleSource from '../sources/ArticleSource';
class ArticleActions {
	constructor() {

		this.generateActions(
			'onSuccess',
			'onFailure'
		);
	}
	getArticleById(id) {
		ArticleSource.getArticleById(id).then((data) => this.onSuccess(data));

	}

	articleCollect(param){
		ArticleSource.articleCollect(param);
	}

	cancelArticleCollect(param){
		ArticleSource.cancelArticleCollect(param);
	}
	getArticleByUser(param){
		return ArticleSource.getArticleByUser(param).then(function(data){
			return data;
		});
	}
}

export default alt.createActions(ArticleActions);