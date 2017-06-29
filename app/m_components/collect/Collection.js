import React from 'react';
import {
	Link
} from 'react-router';
import CollectList from "./CollectList";
import MyInfoNavbar from '../MyInfoNavbar';
import Weixin from '../Weixin';
class Collection extends React.Component {

	componentDidMount(){
		$("#lastPageButton").show();
        $(".footer-nav").hide();
	}

	render() {
		Weixin.getUrl();
		Weixin.weixinReady();
		return (<div>
		    <CollectList />
		</div>)
	}
}
export default Collection;
