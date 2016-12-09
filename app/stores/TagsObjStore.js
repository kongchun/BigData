import alt from '../alt';
import TagsActions from '../actions/TagsObjActions';
class TagsObjStore {
	constructor() {
		this.bindActions(TagsActions);
		this.data = [];
	}

	onSuccess(data) {
		this.data = data;
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(TagsObjStore);