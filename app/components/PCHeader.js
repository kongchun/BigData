import React from 'react';
import {
    Link
    } from 'react-router';

class PCHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        var needLogin = true;
        let userinfo = {};
        var cookie = decodeURIComponent(document.cookie);
        if(cookie.split("userinfo=")[1] && cookie.split("userinfo=")[1] != ""){
            userinfo = JSON.parse(unescape(cookie.split("userinfo=")[1].split(";")[0]))
        }else{
            userinfo = {}
        }
        this.setState({
            data:userinfo
        });
        if (!!userinfo && !!!userinfo.errcode && !!userinfo.nickname) {
            $("#loginModel").remove();
            needLogin = false;
        }else{
            $("#userModel").remove();
        }
        $("#myCollection").bind("click",function(){
            if(needLogin){
                $('#myModal').modal('show');
            }else{
                window.location.href = "/#/myCollection";
                $(".active").removeClass("active");
                $(this).parent().addClass("active");
            }
        });
        $(".pc-nav li a").bind("click",function(){
            if(!needLogin){
                $(".active").removeClass("active");
                $(this).parent().addClass("active");
            }
        });
        $("#pc-to-wx").bind("click",function(){
            $('#myModal').modal('hide');
            toWXLogin();
        });
        $(".wx_login_btn").bind('click',function(){
            toWXLogin();
        });

        function toWXLogin(){
            var turl = window.location.href.split('?_k')[0].split("/#/");
            var url = turl[0];
            if(turl.length>0){
                url = 'http://www.limaodata.com?react='+ turl[1].replace("/",'*');
            }
            var obj = new WxLogin({
                id:"wx_login_panel",
                appid: "wxa5146891ac398f56",
                scope: "snsapi_login",
                redirect_uri: encodeURIComponent(url),
                state: "CAT",
                style: "black",
                href: "http://www.limaodata.com/css/login.css"
            });
            $('#wxLoginModal').modal("show");
        }
    }
    render() {
        let userinfo = this.state.data;
        if (!userinfo) {
            userinfo = {
                nickname: null
            }
        }
        function model(id,title,text,comfirm){
            return (
                <div className="modal fade" id={id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 className="modal-title" id="myModalLabel">{title}</h4>
                            </div>
                            <div className="modal-body">{text}</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" id={comfirm}>去登陆</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        /*

         <div className="web-pc-navigation">
         <div className="row1">
         <div className="nav">
         <ul className="pc-nav">
         <li className="active" id="quickRead">
         <a href="#">快阅</a>
         </li>
         <li>
         <a href="javascript:;" id="myCollection">稍后阅读</a>
         </li>
         <li style={{'float': 'right','marginRight':'-240px'}} id="loginModel">
         <span className="wx_login_btn wx_btn24"></span>
         </li>
         <li  id="userModel" className="wx_login_cotain" style={{'float': 'right','marginRight': '-240px'}}>
         <img src={userinfo.headimgurl} className="wx_login_icon" />
         <span className="wx_login_username" title={"您好,"+userinfo.nickname}>{userinfo.nickname}</span>
         </li>
         </ul>
         </div>
         </div>
         </div>

         */

        function weixinLogin(){
            return <div className="modal fade wxLoginModal" id="wxLoginModal" role="dialog"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <div id="wx_login_panel"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        return (<div className="container web-pc-container">
            <header className="web-pc-header">
                <div className="row">
                    <div className="web-pc-logo owText" title="七只狸猫·快讯 用人工智能方式阅读人工智能资讯">
                        <a href="#">
                            <img className="logo_cat" data-progress-text="100%" data-progress="99" src="images/logo_banner3.png" width="270" height="40" />
                        </a>
                    </div>
                    <div className="web-pc-header-desc hide">
                        <p>每天十分钟阅读人工智能资讯</p>
                    </div>
                    <div className="web-banner-menu">
                        <ul className="pc-nav">
                            <li className="active" id="quickRead">
                                <a href="#">快阅</a>
                            </li>
                            <li>
                                <a href="javascript:;" id="myCollection">稍后阅读</a>
                            </li>
                            <li style={{'float': 'right'}} id="loginModel">
                                <span className="wx_login_btn wx_btn24" title="微信登录后即可使用稍后阅读"></span>
                            </li>
                            <li  id="userModel" className="wx_login_cotain" style={{'float': 'right'}}>
                                <img src={userinfo.headimgurl} className="wx_login_icon" />
                                <span className="wx_login_username" title={"您好,"+userinfo.nickname}>{userinfo.nickname}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {model('myModal','友情提示','稍后阅读是您在登录后对阅读内容进行收藏的列表，您在微信中收藏的内容可以在此处继续阅读。请先登录微信账号！','pc-to-wx')}
            {weixinLogin()}
        </div>);
    }
}


export default PCHeader;