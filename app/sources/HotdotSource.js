var HotdotSource = {
    //获得趋势页面的关键字排行榜信息
    getHotdotSource:function(){
        return new Promise(function(resolve,reject){
            var url = "/api/hotdots";
            $.get(url,{}).done(resolve).fail(reject);
        })
    }
}

export default HotdotSource