import React from 'react';
import {
	Link
} from 'react-router';

import TagsObjStore from '../stores/TagsObjStore';
import TagsObjActions from '../actions/TagsObjActions';

class Tag extends React.Component {
	constructor(props) {
		super(props);
		this.state = TagsObjStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		TagsObjStore.listen(this.onChange);
	}

	componentWillUnmount() {
		TagsObjStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
	componentWillReceiveProps(nextProps) {
		TagsObjActions.getKeyWordsCountJson(nextProps.id);
	}
	render() {
		var tagKeyWords = (this.state.data);
		var artId = tagKeyWords.id;
		let tags = [];
		var keyWordsJSON = tagKeyWords.keyword;
		if(tagKeyWords && tagKeyWords!=[]){
			for(var tag in keyWordsJSON){
                if(keyWordsJSON[tag] > 0){
					tags.push(<a className="tagItem tagActive">{tag}</a>);
				}else{
					tags.push(<a className="tagItem">{tag}</a>);
				}
			}
		}
		//获得传递的json参数
		 function getJsonObj(sourceArr,indexKey){
			 for(var key in sourceArr){
				 if(key== indexKey){
					 sourceArr[key] = sourceArr[key] + 1;
				 }
			 }
			 return sourceArr;
		 }
		 //标签关键字的相关操作
		 $(".tag-cloud").on("click",".tagItem",function(){
			 var indexKey = $(this).text();
			 var articleId = artId;
			 var jsonObj = getJsonObj(keyWordsJSON,indexKey);
			 $(this).addClass("tagActive");
			 TagsObjActions.setKeyWordsCount(articleId,jsonObj);
		 });
		return (
			<div className="content tag-cloud">
				{tags}
			</div>
		)
	}
}

export default Tag;