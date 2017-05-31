import alt from '../alt';
import ArticleListActions from '../actions/ArticleListActions';

class ArticleSimpleStore {
	constructor() {
		this.bindActions(ArticleListActions);
		this.data = {
			data: [],
			count: 0
		};
	}

	onSuccess(data) {
		console.log("ArticleSimpleStore", "onSuccess");
		this.data = data;
		//console.log(data);
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(ArticleSimpleStore);