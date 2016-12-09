import React from 'react';
import {
	Link
} from 'react-router';

import ArticleObjStore from '../stores/ArticleObjStore';
import ArticleObjActions from '../actions/ArticleObjActions';

class Similar extends React.Component {
	constructor(props) {
		super(props);
		this.state = ArticleObjStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		ArticleObjStore.listen(this.onChange);
	}

	componentWillUnmount() {
		ArticleObjStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
	componentWillReceiveProps(nextProps) {
		ArticleObjActions.getArticlesByIds(nextProps.ids);
	}

	render() {
		var articles = (this.state.data);
		let artclelist = articles.map((article) => (
			<Link to={'/article/' + article.id}>
				<div className="samilarItem">
					<div className="item-icon"></div>
					<div key={article.id} id={article.id} className="item">
						{article.title}
					</div>
				</div>
			</Link>
		));
		return (
			<div>
				{artclelist}
			</div>

		)
	}
}

export default Similar;