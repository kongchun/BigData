import React from 'react';
import {
	Link
} from 'react-router';
class CollectItem extends React.Component {
	render(){
	return ( <Link to={'/article/' + this.props.articleid} className="collect-list-item">
		<div className="collect-title">{this.props.title}</div>
		<div className="collect-time">{this.props.time}</div>
	   </Link>);
    }
}
export default CollectItem;
