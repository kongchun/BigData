import alt from '../alt';
import ArticleSource from '../sources/ArticleSource';
class ArticleObjActions {
	constructor() {

		this.generateActions(

			'onSuccess',
			'onFailure'
		);
	}
	getArticlesByIds(ids) {
		ArticleSource.getArticlesByIds(ids).then((data) => this.onSuccess(data));
	}
}

export default alt.createActions(ArticleObjActions);