import React from 'react';
import {
	Link
} from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
class AboutUs extends React.Component {
	render() {
		return (<div>
			<MyInfoNavbar title="七只狸猫" action=""/>
			<div>很久很久以前,这是一个神秘的故事...</div>
		</div>)
	}
}


export default AboutUs;