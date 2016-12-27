import alt from '../alt';
import HotdotActions from '../actions/HotdotActions';
class HotdotObjStore {
	constructor() {
		this.bindActions(HotdotActions);
		this.data = [];
	}

	onSuccess(data) {
		this.data = data;
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(HotdotObjStore);