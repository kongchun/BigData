var CollectSource = {
	getCollectInfoByUser(param){
		return new Promise(function(resolve,reject){
			if(param){
				var url = "/api/articles/getArticleByUser?name="+param.name;
				$.get(url).done(resolve).fail(reject);
			}else{
				console.log("��ȡ�û���Ϣʧ��");
				reject([]);
			}
		})
	}
}
export default CollectSource;