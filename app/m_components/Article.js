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
		this.url = window.location.href.split("?")[0];
	}
	componentDidMount() {
        $("#lastPageButton").show();
		$(".footer-nav").hide();
		const id = this.props.params.id;
		ArticleStore.listen(this.onChange);
		ArticleActions.getArticleById(id);
		var sctollIndex = window.sessionStorage.getItem("urlScroll_"+this.url);
		if(!!sctollIndex){
			$("html,body").animate({scrollTop: sctollIndex}, 10);
		}else{
			$("html,body").animate({scrollTop: 0}, 10);
		}
        $(".btn-go-back").bind("click",function(){
            window.history.go(-1);
        });
		Weixin.getUrl();
	}

	componentWillUnmount() {
		window.sessionStorage.removeItem("urlScroll_"+this.url);
		window.sessionStorage.setItem("urlScroll_"+this.url,document.body.scrollTop);
		ArticleStore.unlisten(this.onChange);
        $("#lastPageButton").hide();
        $(".footer-nav").show();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.params.id != this.props.params.id) {
			ArticleActions.getArticleById(this.props.params.id);
		}
	}
	onChange(state) {
		this.setState(state);
	}
	onHandleFastRead(){
		$(".post-fast").animate({
			height:"hide"
		});
		$(".post-content").animate({
			height:"show"
		});
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}
	render() {
		var article = (this.state.data);
		if (article && article != "") {
			Weixin.weixinReady(article)
		}
		function createMarkup() {
			return {
				__html: article.html
			};
		}
		if(article.length < 1){
			return (<div></div>)
		}
		let style = {"display":"block"}
		let summary = (<section className="post-content"  style={style} dangerouslySetInnerHTML={createMarkup()}></section>);
		if(article.smartSummary){
            return (<div>
                <section className="article-content-wrap ">
                    <div className="container">
                        <div className="row article">
                            <main className="col-md-8 main-content">
                                <article className="post">
                                    <header className="post-head">
                                        <h1 className="post-title">{article.title}</h1>
                                    </header>
                                    {summary}
                                    <footer className="post-footer clearfix">
                                        <div className="pull-left tag-list">
                                            <i className="fa fa-folder-open-o">阅读次数：{article.hits}</i>
                                        </div>
                                        <div className="footer-end-line">
                                            <span className="footer-end-line-wrap"><span className="end-line-left"></span><span className="end-line-font">THE END</span><span className="end-line-right"></span></span>
                                        </div>
                                        <div>
                                            <div className="source-article-url">原网页由七只狸猫转码以便于移动设备阅读<a href={article.url}>查看原文</a></div>
                                            <div className="article-operate-all">
                                                <div className="collectArticle">
													<ArticleCollect showFlag='2' articleId={article.id} articleTitle={article.title} articleSmartSummary={article.smartSummary} tags={article.tags} articleThumbnail={article.thumbnail}/>
                                                </div>
                                            </div>
                                        </div>
                                    </footer>

                                </article>
                            </main>

                            <aside className="col-md-4 sidebar">
                                <div className="widget">
                                    <h4 className="title">相关推荐</h4>
                                    <Similar ids={article.similar}/>
                                </div>
                            </aside>
                            <aside className="col-md-4 sidebar">
                                <div className="widget">
                                    <h4 className="title">关注我们</h4>
                                    <div className="limao-ad-info">
                                        <div className="sports-content-center">
                                            <div className="erweima sports-content-center-left">
                                                <img src="../images/limao.jpg" alt="七只狸猫" width="100" height="100"/>
                                            </div>
                                            <div className="sports-content-center-right">
                                                <div>
													我们致力于用人工智能科技帮你每天获取最有价值的人工智能资讯,长按左侧二维码关注我。
                                                    <div className="author-lishu">&nbsp;</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </div>);
            summary = (<div>
				<div className="post-fast">
						<section className="post-summary"><span className="post-fastRead">狸猫快阅：</span>
							{article.smartSummary}</section>
						<div className="post-summaryBtn" onClick={this.onHandleFastRead.bind(this)}>阅读全文</div>
				</div>
				<section className="post-content" dangerouslySetInnerHTML={createMarkup()}></section>
			</div>)
        }
	}
}
export default Article;

