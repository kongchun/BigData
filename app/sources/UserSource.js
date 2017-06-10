var UserSource = {
    //获得用户信息
    getUserSource:function(unionid){
        return new Promise(function(resolve,reject){
            var url = "/api/user";
            $.get(url,{'unionid':unionid}).done(resolve).fail(reject);
        })
    }
}

export default UserSource