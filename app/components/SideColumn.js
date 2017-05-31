import React from 'react';
import {
    Link
    } from 'react-router';

class SideColumn extends React.Component {

    componentDidMount() {

    }
    render() {
        return (<div className="col-xs-3 pc-right-box">
            <aside className="col-xs-12 sidebar">
                <div className="widget">
                    <h4 className="title">
                        关注我们
                    </h4>
                </div>
                <div className="limao-ad-info">
                    <div className="sports-content-center">
                        <div className="erweima sports-content-center-left">
                            <img src="images/limao.jpg" width="100" height="100"/>
                        </div>
                        <div className="sports-content-center-right">
                            <div>
                                "每天十分钟阅读人工智能科技资讯-用科技视角看世界，扫描左侧二维码关注我"
                                <div className="author-lishu" >By.狸叔</div>
                            </div>
                        </div>

                    </div>
                </div>
            </aside>

            <aside className="col-xs-12 sidebar">
                <div className="widget">
                    <h4 className="title">
                        合作伙伴
                    </h4>
                </div>
                <div className="limao-sponsors-info">
                    <div className="sports-content-center">
                        <ul className="pc-sponsors">
                            <li>
                                <a href="http://www.36dsj.com/" target="_blank"><img src="images/sponsors/l1.png"/></a>
                            </li>
                            <li>
                                <a href="http://www.datayuan.cn/" target="_blank"><img src="images/sponsors/l2.png"/></a>
                            </li>
                            <li>
                                <a href="https://www.leiphone.com/" target="_blank"><img src="images/sponsors/l3.png"/></a>
                            </li>
                            <li>
                                <a href="http://www.cbdio.com/" target="_blank"><img src="images/sponsors/l4.png"/></a>
                            </li>
                            <li>
                                <a href="http://www.jiqizhixin.com/" target="_blank"><img src="images/sponsors/l5.png"/></a>
                            </li>
                        </ul>

                    </div>
                </div>
            </aside>

        </div>);
    }
}


export default SideColumn;