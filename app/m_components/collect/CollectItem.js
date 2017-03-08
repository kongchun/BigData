import React from 'react';
import {
	Link
} from 'react-router';
class CollectItem extends React.Component {
	render(){
	return ( <Link to={'/article/' + this.props.articleid} className="collect-list-item">
		<div className="container container-row">
			<div className="row">
				<div className="col-sm-8">
					<div className="collect-title">{this.props.title}</div>
					<div className="collect-time">{this.props.time}</div>
				</div>
				<div className="col-sm-4">
					<div className="collect-thumbnail"><img className="img-responsive" src={this.props.thumbnail} alt="七只狸猫"/></div>
				</div>
			</div>
		</div>
	   </Link>);
    }
}
export default CollectItem;
