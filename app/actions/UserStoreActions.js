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
		if(userinfo.opendid){
			UserSource.getUserSource(userinfo.opendid).then((data) => this.onSuccess(data));
		}else{
			this.onSuccess({
				openid: "",
				nickname: "",
				collect:[],
				marking:[]
			})
		}
	}
}

export default alt.createActions(UserStoreActions);