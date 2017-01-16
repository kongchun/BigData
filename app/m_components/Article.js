import React from 'react';
import {
	Link
} from 'react-router';

import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';
import Similar from './Similar';
import Tag from './Tag';
import MyInfoNavbar from './MyInfoNavbar';
import ArticleCollect from './ArticleCollect';

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
		return (<div>
			<section className="article-content-wrap ">
	        	<div className="container">
		        	<div className="row article">
			        	<main className="col-md-8 main-content">
			        		<article className="post">
						    <header className="post-head">
						        <h1 className="post-title">{article.title}</h1>

						        <section className="post-meta">
						            <span className="url">来源：<a href={article.url} >{article.url}</a></span>
									
						        </section>
						    </header>
						    <section className="post-content" dangerouslySetInnerHTML={createMarkup()}>
						    </section>
						    <footer className="post-footer clearfix">
					        <div className="pull-left tag-list">
					            <i className="fa fa-folder-open-o">阅读次数：{article.hits}</i>
								<ArticleCollect articleId={article.id}/>
					        </div>
					    </footer>

						</article>
						</main>
						<aside className="col-md-4 sidebar">
							<div className="widget">
								<h4 className="title">关键字</h4>
								<Tag id={article.id}/>
							</div>

							<div className="widget">
								<h4 className="title">相似文章</h4>
								<Similar ids={article.similar}/>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</div>);
	}
}
export default Article;

/*var ArticleCollect = React.createClass({
	getInitialState: function() {
		return {collected: false};
	},
	componentDidMount:function(){
		var _this = this;
		var articleId =  getArticelId(window.location.href);
		//初始化时根据名称查当前用户的信息
		var collectMsg = {
			name:'胡和浩的爷爷',
			articleId:articleId
		}
		function getArticelId(url){
			if(url){
				var lIndex = url.lastIndexOf("/");
				var dotIndex = url.lastIndexOf("?");
				return parseInt(url.substring(lIndex+1,dotIndex));
			}
		}
		ArticleActions.getArticleByUser(collectMsg).then(function(data){
			if(data.collect.indexOf(collectMsg.articleId+"") < 0){
				_this.setState({collected:false});
			}else{
				_this.setState({collected:true});
			}
		});
	},
	onHandleCollectClick:function(event){
	  //收藏文章
	  var currentTarget = event.currentTarget;
	  var articleId = this.props.articleId;
	  if($(currentTarget).hasClass('glyphicon-star-empty')){
		  $(currentTarget).removeClass("glyphicon-star-empty").addClass("glyphicon-star");
		  $(".article-collect-label").text("已收藏");
		  var collectMsg = {
			  name:'胡和浩的爷爷',
			  type:'1',
			  articleId:articleId
		  }
          ArticleActions.articleCollect(collectMsg);
	  }else{
		//取消收藏
		  $(currentTarget).removeClass("glyphicon-star").addClass("glyphicon-star-empty");
		  $(".article-collect-label").text("收藏");
		  var cancelCollectMsg = {
			  name:'胡和浩的爷爷',
			  type:'1',
			  articleId:articleId
		  }
		  ArticleActions.cancelArticleCollect(cancelCollectMsg)
	  }
	},
	render:function(){
		var text = this.state.collected ? "取消收藏":'收藏';
        var clazzName = this.state.collected ? "glyphicon glyphicon-star":"glyphicon glyphicon-star-empty";
		return (
			<span className="article-collect">
				<i className="article-collect-label">{text}</i>
				<i className={clazzName} onClick={this.onHandleCollectClick}></i>
			</span>
		);
	}
});*/

