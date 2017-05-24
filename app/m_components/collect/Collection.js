import React from 'react';
import {
	Link
} from 'react-router';
import CollectList from "./CollectList";
import MyInfoNavbar from '../MyInfoNavbar';
import Weixin from '../Weixin';
class Collection extends React.Component {
	render() {
		Weixin.getUrl();
		Weixin.weixinReady();
		return (<div>
			<MyInfoNavbar title="我的收藏" action=""/>
		    <CollectList />
		</div>)
	}
}
export default Collection;
