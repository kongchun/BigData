import React from 'react';
import {
	Link
} from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
import Weixin from './Weixin';
class FedBack extends React.Component {
	render() {
		Weixin.getUrl();
		Weixin.weixinReady();
		return (<div>
			<MyInfoNavbar title="反馈意见" action=""/>
		</div>)
	}
}
export default FedBack;