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
		//load(ids){
		//	ArticleObjActions.getArticlesByIds(ids)
		//}
	render() {
		var articles = (this.state.data);

		let artclelist = articles.map((article) => (
			<Link to={'/article/' + article.id}>
			<div key={article.id} id={article.id} className="item">
			{article.title}
			</div>
			</Link>

		));

		// console.log(articles.title);
		// var items = [];
		// //articles.forEach(function(article) {
		// //	items.push(<div className="item">{articles[i].title}</div>);
		// //});

		// items.push(<Link to={'/article/' + articles.id}>
		// 	<div key={articles.id} id={articles.id} className="item">{articles.title}</div></Link>);
		return (
			<div>
				{artclelist}
			</div>

		)
	}
}

export default Similar;