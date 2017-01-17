import React from 'react';
import {
	Link
} from 'react-router';
class CollectItem extends React.Component {
	render(){
	return ( <div className="collect-list-item">
		<div className="collect-title">{this.props.title}</div>
		<div className="collect-time">{this.props.time}</div>
	   </div>);
    }
}
export default CollectItem;
