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
				return url.substring(lIndex+1,dotIndex);
			}
		}
    }
	onHandleCollectClick(event){
        var cookie = decodeURIComponent(document.cookie);
        if(cookie.split("userinfo=")[1] && cookie.split("userinfo=")[1] != ""){
            var userinfo = null;
            userinfo = JSON.parse(unescape(cookie.split("userinfo=")[1].split(";")[0]))
            if (!!userinfo && !!!userinfo.errcode && !!userinfo.nickname) {

            }else{
                $('#myModal').modal('show');
				return false;
            }
        }
		//收藏文章
		var isCollectedFlag = this.state.collected;
		var currentTarget = event.currentTarget;
		var articleId = this.props.articleId;
		var articleTitle = this.props.articleTitle;
		var articleThumbnail = this.props.articleThumbnail;
		var articleSmartSummary = this.props.articleSmartSummary;
		var tags = this.props.tags;
		var currentUser = this.currentUser;
		if(!isCollectedFlag){
			var collectMsg = {
				openId:currentUser.openid,
				unionid:currentUser.unionid,
				name:currentUser.nickname,
				articleId:articleId,
				collectDate:new Date().toLocaleString(),
				articleTitle:articleTitle,
                thumbnail:articleThumbnail,
                tags:tags,
                articleSmartSummary:articleSmartSummary
            }

			ArticleActions.articleCollect(collectMsg);
			this.setState({collected:true});
		}else{
			//取消收藏
			var cancelCollectMsg = {
				openId:currentUser.openid,
				unionid:currentUser.unionid,
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
