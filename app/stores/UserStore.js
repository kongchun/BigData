import alt from '../alt';
import UserStoreActions from '../actions/UserStoreActions';

class UserStore {
    constructor() {
        this.bindActions(UserStoreActions);
        this.data = {
            openid: "",
            sex: 1,
            languag: 'zh_CN',
            city: '����',
            province: '����',
            country: '�й�',
            headimgurl: "",
            nickname: "",
            collect: [],
            marking: {},
            privilege: []
        };
    }

    onSuccess(data) {
        console.log("UserStore", "onSuccess");
        this.data = data;
        //console.log(data);
    }

    onFailure(error) {
        toastr.error(error);
    }
}

export default alt.createStore(UserStore);