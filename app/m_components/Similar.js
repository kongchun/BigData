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
		var articlelist;
		if(articles.length > 1){
			articlelist = articles.map((article) => (
				<Link to={'/article/' + article.id}>
					<div className="container samilarItem">
						<div key={article.id} id={article.id}>
							<span className="col-xs-8 similar-articel-title">{article.title}</span>
						<span className="col-xs-4 similar-article-headImg">
							<img src={article.thumbnail} alt={article.title} width='110' height='58'/>
						</span>
						</div>
					</div>
				</Link>
			));
		}else{
			articlelist = (<div className="simailar-article-null">
				哎呀，没有更多推荐，好尴尬
			</div>)
		}

		return (
			<div>
				{articlelist}
			</div>

		)
	}
}

export default Similar;