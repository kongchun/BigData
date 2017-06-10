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
        $(".post-footer").on("click",".modal-weixin-buttom",function(){
           $("#wxPushModal").modal("show");
        });
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
        function weixinPush(){
            return <div className="modal fade wxPushModal" id="wxPushModal" role="dialog"  aria-hidden="true">
                <div className="modal-dialog modal-wx-panel">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button title="关闭" type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">分享到微信朋友圈</h4>
                        </div>
                        <div className="modal-body modal-center">
                            <div id="urlcode"></div>
                        </div>
                        <div className="modal-wx-footer">
                            打开微信，点击底部的“发现”，使用“扫一扫”即可将网页分享至朋友圈。
                        </div>
                    </div>
                </div>
            </div>
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
                                <div className="bdsharebuttonbox">
                                    <span className="bds_more1" style={{'float':'left'}}>分享到&nbsp;</span>
                                    <a href="#" className="bds_more hide" data-cmd="more"></a>
                                    <a href="#" className="bds_copy" data-cmd="copy" title="分享到复制网址"></a>
                                    <a href="#" className="bds_mail" data-cmd="mail" title="分享到邮件分享"></a>
                                    <a href="#" className="bds_youdao" data-cmd="youdao" title="分享到有道云笔记"></a>
                                    <a href="#" className="bds_evernotecn" data-cmd="evernotecn" title="分享到印象笔记"></a>
                                    <a href="#" className="bds_qingbiji" data-cmd="qingbiji" title="分享到轻笔记"></a>
                                    <a href="#" className="bds_qzone hide" data-cmd="qzone" title="分享到QQ空间"></a>
                                    <a href="#" className="bds_bdysc" data-cmd="bdysc" title="分享到百度云收藏"></a>
                                    <a href="#" className="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                    <a href="#" className="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                                    <a href="#" className="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                                    <a href="#" className="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
                                    <div href="javascript:;" className="bds_weixin modal-weixin-buttom" data-cmd="modal-weixin-buttom" title="分享到微信"><img src="images/weixin/icon16_wx_logo.png" /></div>
                                    <div className="pull-right" title="收藏" style={{cursor:'pointer'}}>
                                        <ArticleCollect articleId={article.id} articleTitle={article.title} articleSmartSummary={article.smartSummary} tags={article.tags} articleThumbnail={article.thumbnail}/>
                                    </div>
                                </div>

					    </footer>
                                {weixinPush()}
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