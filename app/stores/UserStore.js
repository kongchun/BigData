import alt from '../alt';
import UserStoreActions from '../actions/UserStoreActions';

class UserStore {
    constructor() {
        this.bindActions(UserStoreActions);
        this.data = {
            openid: "",
            unionid: "",
            sex: 1,
            languag: 'zh_CN',
            city: '苏州',
            province: '江苏',
            country: '中国',
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