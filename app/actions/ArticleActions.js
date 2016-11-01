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
}

export default alt.createActions(ArticleActions);