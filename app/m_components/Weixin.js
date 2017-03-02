/**
 * Created by Administrator on 2017/1/17.
 */
import alt from '../alt';
class Weixin {
    constructor() {
    }
    getUrl(){
        var url = location.href.split('#')[0];
        var js_config = { 'url': url };
        this.hander_jssdk(js_config);
    }
    hander_jssdk(param) {
        $.ajax({
            url: '/getSignature',
            type: 'GET',
            data: param,
            datatype: 'json',
            success: function success(data) {
                var appId = data.appId;
                var noncestr = data.noncestr;
                var jsapi_ticket = data.jsapi_ticket;
                var timestamp = data.timestamp;
                var signature = data.signature;
                wx.config({
                    debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appId, //必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: noncestr, //必填，生成签名的随机串
                    signature: signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2
                });
            }
        });
    }
    weixinReady(article){
        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                success: function success(res) {}
            });

            //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: article.title, // 分享标题
                link: location.href,
                imgUrl: article.thumbnail, // 分享图标
                success: function success(res) {},
                cancel: function cancel(res) {}
            });
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: article.title, // 分享标题
                desc: "七只狸猫：人工智能助手！", // 分享描述
                link: location.href,
                imgUrl: article.thumbnail, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: function success(res) {},
                cancel: function cancel(res) {}
            });

            wx.error(function (res) {});
        });
    }
}
export default alt.createActions(Weixin);;