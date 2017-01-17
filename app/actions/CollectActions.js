import alt from '../alt';
import CollectSource from '../sources/CollectSource';
class CollectActions {
	constructor() {
		this.generateActions(
			'onSuccess',
			'onFailure'
		);
	}

	getCollectInfoByUser(param){
		CollectSource.getCollectInfoByUser(param).then((data) => this.onSuccess(data)).catch(() => this.onSuccess([]));
	}
}

export default alt.createActions(CollectActions);