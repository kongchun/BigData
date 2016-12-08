import alt from '../alt';
import ArticleSource from '../sources/ArticleSource';
class TagsObjActions {
	constructor() {

		this.generateActions(

			'onSuccess',
			'onFailure'
		);
	}
	//��ȡ��ǰ�ؼ���
	getKeyWordsCountJson(artId){
		ArticleSource.getKeyWordsCountJson(artId).then((data) => this.onSuccess(data)).catch(() => this.onSuccess([]));
	}
	//�ؼ���ѡ�к����̨����
	setKeyWordsCount(articleId,countArr){
		ArticleSource.setKeyWordsCount(articleId,countArr);
	}
}

export default alt.createActions(TagsObjActions);