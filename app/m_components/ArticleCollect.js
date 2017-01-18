import React from 'react';
import {
	Link
} from 'react-router';
import ArticleActions from '../actions/ArticleActions';
import UserActions from '../actions/UserStoreActions';
import UserStore from '../stores/UserStore';
class ArticleCollect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {collected: false};
	}
	componentDidMount(){
		var _this = this;
		var articleId =  getArticelId(window.location.href);
		UserActions.getUserById()
		var currentUser = UserStore.getState();
		//初始化时根据名称查当前用户的信息
		var collectMsg = {
			openId:currentUser.openid,
			name:currentUser.nickname,
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
			var hasCollect = false;
			for(var i in data.collect){
				if(data.collect[i].articleId == articleId){
					hasCollect = true;
					break;
				}
			}
			if(hasCollect){
				_this.setState({collected:true});
			}else{
				_this.setState({collected:false});
			}
		});
    }
	onHandleCollectClick(event){
		//收藏文章
		var currentTarget = event.currentTarget;
		var articleId = this.props.articleId;
		var articleTitle = this.props.articleTitle;
		var currentUser = UserActions.getUserById();
		if($(currentTarget).hasClass('glyphicon-star-empty')){
			$(currentTarget).removeClass("glyphicon-star-empty").addClass("glyphicon-star");
			$(".article-collect-label").text("取消收藏");
			var collectMsg = {
				openId:currentUser.openid,
				name:currentUser.nickname,
				articleId:articleId,
				collectDate:new Date().toLocaleString(),
				articleTitle:articleTitle
			}
			ArticleActions.articleCollect(collectMsg);
		}else{
			//取消收藏
			$(currentTarget).removeClass("glyphicon-star").addClass("glyphicon-star-empty");
			$(".article-collect-label").text("收藏");
			var cancelCollectMsg = {
				openId:currentUser.openid,
				name:currentUser.nickname,
				articleId:articleId
			}
			ArticleActions.cancelArticleCollect(cancelCollectMsg)
		}
    }
	render(){
		var collect = this.state.collected;
		var text = collect ? "取消收藏":'收藏';
		var clazzName = collect ? "glyphicon glyphicon-star":"glyphicon glyphicon-star-empty";
		return (
			<span className="article-collect">
					<i className="article-collect-label">{text}</i>
					<i className={clazzName} onClick={this.onHandleCollectClick.bind(this)}></i>
			</span>
		);
    }
}

export default ArticleCollect;
