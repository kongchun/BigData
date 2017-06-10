import alt from '../alt';
import UserSource from '../sources/UserSource';
class UserStoreActions {
	constructor() {
		this.generateActions(
			'onSuccess',
			'onFailure'
		);
	}
	getUser(){
		let user = document.cookie;
		let userinfo = {};
		let cookies = document.cookie.split("userinfo=");
		if (cookies.length > 1) {
			var values = cookies[1].split(";");
			userinfo = JSON.parse(unescape(values[0]));
		}
		if(!userinfo){
			userinfo.openid = "";
			userinfo.unionid = "";
		}
		return UserSource.getUserSource(userinfo.unionid).then((data) => this.onSuccess(data[0]));
	}
	getUserById() {
		let user = document.cookie;
		let userinfo = {};
		let cookies = document.cookie.split("userinfo=");
		if (cookies.length > 1) {
			var values = cookies[1].split(";");
			userinfo = JSON.parse(unescape(values[0]));
		}
		if(!userinfo){
			userinfo.unionid = "";
		}
		return UserSource.getUserSource(userinfo.unionid).then(function(data){return data});
	}
}

export default alt.createActions(UserStoreActions);