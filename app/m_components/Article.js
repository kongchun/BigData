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
		var url = location.href.split('#')[0];
		var js_config = { 'url': url };
		this.hander_jssdk(js_config);
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
	hander_jssdk(param) {
		$.ajax({
			url: '/getSignature',
			type: 'GET',
			data: param,
			datatype: 'json',
			success: function success(data) {
				var appId = data.appId;
				var noncestr = data.noncestr;
				var jsapi_ticket = data.jsapi_ticket;
				var timestamp = data.timestamp;
				var signature = data.signature;
				wx.config({
					debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appId, //必填，公众号的唯一标识
					timestamp: timestamp, // 必填，生成签名的时间戳
					nonceStr: noncestr, //必填，生成签名的随机串
					signature: signature, // 必填，签名，见附录1
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2
				});
			}
		});
	}
	render() {
		var article = (this.state.data);
		/*if (article && article != "") {
			wx.ready(function () {
				wx.checkJsApi({
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
					success: function success(res) {}
				});

				//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
				wx.onMenuShareTimeline({
					title: article.title, // 分享标题
					link: location.href,
					imgUrl: article.thumbnail, // 分享图标
					success: function success(res) {},
					cancel: function cancel(res) {}
				});
				//获取“分享给朋友”按钮点击状态及自定义分享内容接口
				wx.onMenuShareAppMessage({
					title: article.title, // 分享标题
					desc: "七只狸猫：人工智能助手！", // 分享描述
					link: location.href,
					imgUrl: article.thumbnail, // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					success: function success(res) {},
					cancel: function cancel(res) {}
				});
				wx.error(function (res) {});
			});
		}*/
		function createMarkup() {
			return {
				__html: article.html
			};
		}
		if(article.length < 1){
			return (<div></div>)
		}
		return (<div>
			<section className="article-content-wrap ">
	        	<div className="container">
		        	<div className="row article">
			        	<main className="col-md-8 main-content">
			        		<article className="post">
						    <header className="post-head">
						        <h1 className="post-title">{article.title}</h1>
						    </header>
						    <section className="post-content" dangerouslySetInnerHTML={createMarkup()}>
						    </section>
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
										<ArticleCollect articleId={article.id} articleTitle={article.title}/>
									</div>
								</div>
					        </div>
					    </footer>

						</article>
						</main>

						<aside className="col-md-4 sidebar">
							<div className="widget">
								<h4 className="title">狸叔推荐</h4>
								<Similar ids={article.similar}/>
							</div>
						</aside>
						<aside className="col-md-4 sidebar">
						<div className="widget">
						  <h4 className="title">勾搭狸叔</h4>
							<div className="limao-ad-info">
								<div className="sports-content-center">
									<div className="erweima sports-content-center-left">
										<img src="../images/limao.jpg" alt="七只狸猫" width="100" height="100"/>
									</div>
									<div className="sports-content-center-right">
										<div>
											狸叔划重点,带你静观人工智能风起云涌,长按左侧二维码关注我。
											<div className="author-lishu">By.狸叔</div>
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
	}
}
export default Article;

