import React from 'react';
import {
	Link
} from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
class MyNote extends React.Component {
	render() {
		return (<div>
			<MyInfoNavbar title="我的笔记" action=""/>
			<div>您还没有笔记</div>
		</div>)
	}
}


export default MyNote;
