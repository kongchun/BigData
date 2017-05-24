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
            <MyInfoNavbar title="七只狸猫·端午快讯 PC版" action=""/>
            <div className="fedBackInfo">
                <h4>www.limaodata.com</h4>
                <div className="fedBackInfo-group">
                    <p>1.手机收藏电脑访问</p>
                    <p>2.便捷的浏览方式</p>
                </div>

            </div>
        </div>)
    }
}
export default PcWebSite;