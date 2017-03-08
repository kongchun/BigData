import React from 'react';
import {
	Link
} from 'react-router';
import ArticleActions from '../actions/ArticleActions';
import UserActions from '../actions/UserStoreActions';
class ArticleCollect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {collected: false};
		this.currentUser = null;
	}
	componentDidMount(){
		var _this = this;
		var articleId =  getArticelId(window.location.href);
		UserActions.getUserById().then(function(data){
			var currentUser = data[0];
			_this.currentUser = currentUser
			var hasCollect = false;
			for(var i in currentUser.collect){
				if(currentUser.collect[i].articleId == articleId){
					hasCollect = true;
					break;
				}
			}
			if(hasCollect){
				_this.setState({collected:true});
			}else{
				_this.setState({collected:false});
			}
		})
		//初始化时根据名称查当前用户的信息

		function getArticelId(url){
			if(url){
				var lIndex = url.lastIndexOf("/");
				var dotIndex = url.lastIndexOf("?");
				return parseInt(url.substring(lIndex+1,dotIndex));
			}
		}
    }
	onHandleCollectClick(event){
		//收藏文章
		var isCollectedFlag = this.state.collected;
		var currentTarget = event.currentTarget;
		var articleId = this.props.articleId;
		var articleTitle = this.props.articleTitle;
		var articleThumbnail = this.props.articleThumbnail;
		var currentUser = this.currentUser;
		if(!isCollectedFlag){
			var collectMsg = {
				openId:currentUser.openid,
				name:currentUser.nickname,
				articleId:articleId,
				collectDate:new Date().toLocaleString(),
				articleTitle:articleTitle,
				thumbnail:articleThumbnail
			}
			ArticleActions.articleCollect(collectMsg);
			this.setState({collected:true});
		}else{
			//取消收藏
			var cancelCollectMsg = {
				openId:currentUser.openid,
				name:currentUser.nickname,
				articleId:articleId,
				thumbnail:currentUser.headimgurl
			}
			ArticleActions.cancelArticleCollect(cancelCollectMsg);
			this.setState({collected:false});
		}
    }
	render(){
		var collect = this.state.collected;
		var text = collect ? "取消收藏":'收藏';
		var clazzName = collect ? "glyphicon glyphicon-star":"glyphicon glyphicon-star-empty";
		return (
			<span className="article-collect">
					<span className="article-collect-label" onClick={this.onHandleCollectClick.bind(this)}>{text}</span>
			</span>
		);
    }
}

export default ArticleCollect;
