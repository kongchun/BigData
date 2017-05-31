import React from 'react';
import {
	Link
} from 'react-router';

import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';
import Similar from './Similar';
import Tag from './Tag';
import ArticleCollect from './ArticleCollect';
import Weixin from './Weixin';

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = ArticleStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		const id = this.props.params.id;
		ArticleStore.listen(this.onChange);
		ArticleActions.getArticleById(id);
        Weixin.updateUrlCode();
	}

	componentWillUnmount() {
		ArticleStore.unlisten(this.onChange);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.params.id != this.props.params.id) {
			ArticleActions.getArticleById(this.props.params.id);
		}
	}
	onChange(state) {
		this.setState(state);
	}
	render() {
		var article = (this.state.data);
		function createMarkup() {
			return {
				__html: article.html
			};
		}
        function markTag(tags){
            if(!!!tags){
                return null;
            }
            return tags.map((tag) => (
                <span className="article-more-tag">{tag}</span>
            ))
        }
		return (
			<section className="content-wrap ">
	        	<div className="container1">
		        	<div className="row article">
			        	<main className="col-md-8 main-content">
			        		<article className="post">
						    <header className="post-head">
						        <h1 className="post-title">{article.title}</h1>

						        <section className="post-meta hide">
						            <span className="url">来源：<a href={article.url} >{article.url}</a></span>
						        </section>
						    </header>
						    <section className="post-content" style={{display: 'block'}} dangerouslySetInnerHTML={createMarkup()}>
						    </section>
						    <footer className="post-footer clearfix">
					        <div className="pull-right" title="收藏" style={{cursor:'pointer'}}>
                                <ArticleCollect articleId={article.id} articleTitle={article.title} articleSmartSummary={article.smartSummary} tags={article.tags} articleThumbnail={article.thumbnail}/>
					        </div>
					    </footer>

						</article>
						</main>
						<aside className="col-md-4 sidebar">

							<div className="widget">
								<h4 className="title">快阅</h4>
								<p>{article.smartSummary}</p>
							</div>

							<div className="widget">
								<h4 className="title">标签</h4>
								<p>{markTag(article.tags)}</p>
							</div>

							<div className="widget">
								<h4 className="title">相似文章</h4>
								<Similar ids={article.similar}/>
							</div>
						</aside>
					</div>
				</div>
			</section>
		);
	}
}

export default Article;