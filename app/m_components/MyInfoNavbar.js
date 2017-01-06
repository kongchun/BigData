import React from 'react';
import {
	Link
} from 'react-router';

class MyInfoNavbar extends React.Component {
	constructor(props) {
		super(props);
	}
	handleReturnClick(event){
		history.go(-1);
    }
	componentWillMount(){
		var action = this.props.action;
		if(!action){
			$(".collect-edit").hide();
		}
	}
	render(){
		return (
			<div className="collectNavbar">
				<span className="collect-returnBtn glyphicon glyphicon-chevron-left" onClick={this.handleReturnClick}></span>
				<span className="collect-text">{this.props.title}</span>
				<span className="collect-edit">{this.props.action}</span>
			</div>
		);
    }
}

export default MyInfoNavbar;