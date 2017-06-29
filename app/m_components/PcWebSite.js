import React from 'react';
import {
    Link
    } from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
import Weixin from './Weixin';
class PcWebSite extends React.Component {

    componentDidMount(){
        $("#lastPageButton").show();
        $(".footer-nav").hide();
    }

    render() {
        Weixin.getUrl();
        //<MyInfoNavbar title="七只狸猫·快讯 PC版" action=""/>
        return (<div>

            <div className="fedBackInfo">
                <div className="fedBackInfo-group">
                    <p>1.欢迎访问 www.limaodata.com</p>
                    <p>2.微信免注册直接登录</p>
                    <p>3.通过【稍后阅读】可以获取微信中稍后阅读数据</p>
                </div>
                <div className="fedBackInfo-group">
                    <p>快速预览</p>
                    <p><img src="images/pc_view.png" width="85%" /></p>
                </div>

            </div>
        </div>)
        Weixin.weixinReady();
    }
}
export default PcWebSite;