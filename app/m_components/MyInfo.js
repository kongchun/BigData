import React from 'react';
import {
    Link
    } from 'react-router';
class MyInfo extends React.Component {

    render() {
        return (
            <div className="myInfo-content-wrap">
               <div className="myInfo-header-banner">
                    <div className="myInfo-header-loginInfo">
                        <div className="myInfo-header-image-border">
                            <div className="myInfo-header-image">登&nbsp;录</div>
                            <span className="myInfo-header-loginTip">登录推荐更精准</span>
                        </div>

                    </div>
               </div>
               <div className="myInfo-container-list">
                   <ul>
                       <li>
                           <Link to={'/collection'} className="container-list">
                               <span className="myInfo-label">我的收藏</span><span className="glyphicon glyphicon-chevron-right glyphicon-next"></span>
                           </Link>
                       </li>
                       <li>
                           <Link to={'/note'} className="container-list">
                               <span className="myInfo-label">我的笔记</span><span className="glyphicon glyphicon-chevron-right glyphicon-next"></span>
                           </Link>
                       </li>
                       <li>
                           <Link to={'/fedBack'}  className="container-list">
                                <span className="myInfo-label">我要反馈</span><span className="glyphicon glyphicon-chevron-right glyphicon-next"></span>
                           </Link>
                       </li>

                       <li>
                           <Link to={'/aboutUs'} className="container-list">
                               <span className="myInfo-label">关于我们</span><span className="glyphicon glyphicon-chevron-right glyphicon-next"></span>
                           </Link>
                       </li>
                   </ul>
               </div>
            </div>
        );
    }
}

export default MyInfo;
