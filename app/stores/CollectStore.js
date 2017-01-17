import alt from '../alt';
import CollectActions from '../actions/CollectActions';

class CollectStore {
	constructor() {
		this.bindActions(CollectActions);
		this.data = [];
	}

	onSuccess(data) {
		console.log("CollectStore", "onSuccess");
		this.data = data;
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(CollectStore);