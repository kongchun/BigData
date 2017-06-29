var ArticleSource = {
    page: function(page, limit = 10) {
        return new Promise(function(resolve, reject) {
            var url = "/api/articles"
            $.get(url, {
                "page": page,
                "limit": limit
            }).done(resolve).fail(reject);
        })
    },
    getArticleById: function(id) {
        return new Promise(function(resolve, reject) {
            var url = "/api/article/" + id;
            $.get(url, {}).done(resolve).fail(reject);
        })
    },
    getArticlesByIds: function(ids) {
        return new Promise(function(resolve, reject) {
            if (ids == "") {
                resolve([]);
            } else {
                var url = "/api/articles/ids/" + ids;
                $.get(url, {}).done(resolve).fail(reject);
            }
        })
    },
    //设置关键字权重
    setKeyWordsCount(articleId,countArr){
        return new Promise(function(resolve,reject){
            if(articleId==''){
                reject();
            }else{
                var url = "/api/articles/setKeyWordsCount";
                $.post(url,{
                    id : articleId,
                    arr:countArr
                }).done(resolve).fail(reject);
            }
        })
    },
    getKeyWordsCountJson(artId){
        return new Promise(function(resolve, reject) {
            if (artId == "") {
                resolve([]);
            } else {
                var url = "/api/articles/getKeyWordsCountJson";
                $.get(url, {
                    id:artId
                }).done(resolve).fail(reject);
            }
        })
    },
    articleCollect(param){
        return new Promise(function(resolve,reject){
            if(param){
                var url = "/api/articles/setArticleCollect";
                $.post(url,{
                    openId:param.openId,
                    unionid:param.unionid,
                    name:param.name,
                    articleId:param.articleId,
                    collectDate:param.collectDate,
                    articleTitle:param.articleTitle,
                    thumbnail:param.thumbnail,
                    tags:param.tags,
                    articleSmartSummary:param.articleSmartSummary
                }).done(resolve).fail(reject);
            }else{
                console.log("收藏文章失败.");
                reject([]);
            }
        })
    },
    cancelArticleCollect(param){
        return new Promise(function(resolve,reject){
            if(param){
                var url = "/api/articles/cancelArticleCollect";
                $.post(url,{
                    openId:param.openId,
                    unionid:param.unionid,
                    name:param.name,
                    articleId:param.articleId,
                    thumbnail:param.thumbnail
                }).done(resolve).fail(reject);
            }else{
                console.log("取消收藏失败");
                reject([]);
            }
        })
    },
    getArticleByUser(param){
        return new Promise(function(resolve,reject){
            if(param){
                var url = "/api/articles/getArticleByUser?unionid="+param.unionid+"&articleId="+param.articleId;
                $.get(url).done(resolve).fail(reject);
            }else{
                console.log("获取用户信息失败");
                reject([]);
            }
        })
    },
    getArticlesByHits: function(page, limit, time) {
        return new Promise(function(resolve, reject) {
            if (time == "") {
                resolve([]);
            } else {
                var url = "/api/articles/byHits?page="+page+"&times="+time+"&limit="+limit;
                $.get(url, {}).done(resolve).fail(reject);
            }
        })
    },
}

export default ArticleSource;
