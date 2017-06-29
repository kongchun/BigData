var ActionSource = {
    //0.登录微信信息
    //1.阅读文章
    //2.收藏文章
    //3.取消收藏文章
    //4.查看文章快阅信息
    //5.关键词搜索
    //6.请求链接推广记录
    //7.PC二维码登录

    loginLog: function() {
        var url = "/api/actionLog";
        $.post(url, {
            "action": '7'
        }).done(function(){
            //console.log('login log done');
        }).fail(function(){
            console.log('login log fail');
        });
    },
    quickReadLog: function(articleId,title){
        var url = "/api/actionLog";
        $.post(url, {
            "action": '4',
            "artid": articleId,
            "title": title
        }).done(function(){
            //console.log('login log done');
        }).fail(function(){
            console.log('login log fail');
        });
    }
}

export default ActionSource;
