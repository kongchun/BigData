import alt from '../alt';
import ArticleActions from '../actions/ArticleObjActions';
class ArticleObjStore {
	constructor() {
		this.bindActions(ArticleActions);
		this.data = [];
	}

	onSuccess(data) {
		this.data = data;
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(ArticleObjStore);