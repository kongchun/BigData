import React from 'react';
import {
	Link
} from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
import Weixin from './Weixin';
class FedBack extends React.Component {

    componentDidMount(){
        $("#lastPageButton").show();
        $(".footer-nav").hide();
    }

	render() {
		Weixin.getUrl();
		Weixin.weixinReady();
		return (<div>
			<div className="fedBackInfo">
                <h4>联系我们</h4>
                <div className="fedBackInfo-group">
                    <p><b>一、建议反馈</b></p>
                    <p>如果您对我们有任何建议或者吐槽，欢迎联系我们的攻城狮，请扫描“下方的二维码”或添加微信号limao-data告诉我们。</p>
                    <p className="fedBackInfo-contract-pic"><img src="../images/weixin/kf.jpg" width="80%" height="80%"/></p>
                </div>
                <div className="fedBackInfo-group">
                    <p><b>二、合作</b></p>
                    <p>仅限合作沟通，加好友请注明您所在的公司和来意，谢谢！</p>
                    <p><b>微信：</b>limao-data</p>
                    <p><b>邮箱：</b>cooperation@limaodata.com</p>
                </div>
            </div>
		</div>)
	}
}
export default FedBack;