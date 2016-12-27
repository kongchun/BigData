import alt from '../alt';
import HotdotSource from '../sources/HotdotSource';
class HotdotActions {
    constructor() {
        this.generateActions(
            'onSuccess',
            'onFailure'
        );
    }
    //获取关键在排行榜
    getHotdotDatas(){
        HotdotSource.getHotdotSource().then((data) => this.onSuccess(data)).catch(() => this.onSuccess([]));
    }
}

export default alt.createActions(HotdotActions);
