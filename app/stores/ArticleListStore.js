import alt from '../alt';
import ArticleListActions from '../actions/ArticleListActions';

class ArticleListStore {
	constructor() {
		this.bindActions(ArticleListActions);
		this.data = {
			data: [],
			count: 0
		};
	}

	onSuccess(data) {
		console.log("ArticleListStore", "onSuccess");
		this.data = data;
		//console.log(data);
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(ArticleListStore);