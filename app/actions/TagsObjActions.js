import alt from '../alt';
import ArticleSource from '../sources/ArticleSource';
class TagsObjActions {
	constructor() {

		this.generateActions(

			'onSuccess',
			'onFailure'
		);
	}
	//获取当前关键字
	getKeyWordsCountJson(artId){
		ArticleSource.getKeyWordsCountJson(artId).then((data) => this.onSuccess(data)).catch(() => this.onSuccess([]));
	}
	//关键字选中后传入后台保存
	setKeyWordsCount(articleId,countArr){
		ArticleSource.setKeyWordsCount(articleId,countArr);
	}
}

export default alt.createActions(TagsObjActions);