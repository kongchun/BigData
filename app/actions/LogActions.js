import alt from '../alt';
import ActionSource from '../sources/ActionSource.js';
class LogActions {
    constructor() {
        this.generateActions(
            'onSuccess',
            'onFailure'
        );
    }
    loginLog() {
        ActionSource.loginLog();
    }
    quickReadLog(articleId , title){
        ActionSource.quickReadLog(articleId, title);
    }

}

export default alt.createActions(LogActions);