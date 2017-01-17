import alt from '../alt';
import UserSource from '../sources/UserSource';
class UserStoreActions {
	constructor() {
		this.generateActions(
			'onSuccess',
			'onFailure'
		);
	}
	getUserById() {
		let user = document.cookie;
		let userinfo = null;
		let cookies = document.cookie.split("userinfo=");
		if (cookies.length > 1) {
			var values = cookies[1].split(";");
			userinfo = JSON.parse(values[0]);
		}
		if(userinfo.openid){
			UserSource.getUserSource(userinfo.opendid).then((data) => this.onSuccess(data));
		}else{
			this.onSuccess({
				openid: "",
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
			})
		}
	}
}

export default alt.createActions(UserStoreActions);