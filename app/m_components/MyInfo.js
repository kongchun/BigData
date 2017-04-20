import React from 'react';
import {
    Link
    } from 'react-router';
import UserActions from '../actions/UserStoreActions';
import UserStore from '../stores/UserStore.js';
import Weixin from './Weixin';
class MyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        UserStore.unlisten(this.onChange);
        Weixin.getUrl();
        Weixin.weixinReady();
    }

    componentDidMount() {
        UserStore.listen(this.onChange);
        UserActions.getUser();
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let userinfo = this.state.data;
        if (!userinfo) {
            userinfo = {
                nickname: null
            }
        }
        $(".loginDiv").click(function () {
            location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzlxNzcxMzkxMA==&scene=124#wechat_redirect";
        })
        return (
            <div className="myInfo-content-wrap">
                <div className="myInfo-header-banner">
                    <div className="myInfo-header-loginInfo">
                        {(!userinfo.nickname) ? <div>
                            <div className="icon-lmuser-circle-o loginDiv"></div>
                            <div className="login-span">登录七只狸猫</div>
                        </div> : <div className="myInfo-header-image-border">
                            <img className="user-thumnail-size loginDiv" src={userinfo.headimgurl} alt="头像"/>

                            <div className="myInfo-header-name">{userinfo.nickname}</div>
                        </div>}
                    </div>
                </div>
                <div className="myInfo-container-list">
                    <ul>
                        <li>
                            <Link to={'/collection'} className="container-list">
                                <span className="myInfo-label">我的收藏</span><i className="icon-lmangle-right"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/fedBack'} className="container-list">
                                <span className="myInfo-label">我要反馈</span><i className="icon-lmangle-right"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="myInfo">七只狸猫，带你静观人工智能花开花落。</div>
            </div>
        );
    }
}

export default MyInfo;
