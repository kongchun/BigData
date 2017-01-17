import React from 'react';
import {
	Link
} from 'react-router';
import MyInfoNavbar from '../MyInfoNavbar';
import CollectList from "./CollectList";
class Collection extends React.Component {
	render() {
		return (<div>
			<MyInfoNavbar title="收藏" action="编辑"/>
		    <CollectList />
		</div>)
	}
}
export default Collection;
