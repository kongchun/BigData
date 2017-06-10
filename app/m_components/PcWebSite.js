import React from 'react';
import {
    Link
    } from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
import Weixin from './Weixin';
class PcWebSite extends React.Component {
    render() {
        Weixin.getUrl();
        Weixin.weixinReady();
        return (<div>
            <MyInfoNavbar title="七只狸猫·快讯 PC版" action=""/>
            <div className="fedBackInfo">
                <div className="fedBackInfo-group">
                    <p>1.PC端访问地址 www.limaodata.com</p>
                    <p>2.微信免注册直接登录</p>
                    <p>3.稍后阅读数据可以在PC端【我的】一栏中获取阅读</p>
                </div>
                <div className="fedBackInfo-group">
                    <p>快速预览</p>
                    <p><img src="images/pc_view.png" width="85%" /></p>
                </div>

            </div>
        </div>)
    }
}
export default PcWebSite;