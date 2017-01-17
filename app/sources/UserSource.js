var UserSource = {
    //获得用户信息
    getUserSource:function(openid){
        return new Promise(function(resolve,reject){
            var url = "/api/user";
            $.get(url,{'openid':openid}).done(resolve).fail(reject);
        })
    }
}

export default UserSource