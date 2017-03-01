import React from 'react';
import {
    Link
    } from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';

class Sports extends React.Component {

    render() {
        return (<div>
            <div className="sports-content-wrap">
                <div className="sports-content-top">
                    <div id="myCarousel" className="carousel slide">
                        <img className="img-responsive" src="../images/headImg.jpg" alt="七只狸猫"/>
                    </div>
                </div>
                <div className="sports-content-bottom">
                    <p className="sports-content-bottom-wrap">
                        <div className="sports-content-address"><span className="title">七只狸猫</span><div className="address">中国苏州·七里山塘</div></div>
                        <p>苏州山塘街是有着千年历史的中国文化名街。</p>
                        <p>相传，明朝初年刘伯温来苏州时，感到山塘河卧伏白，状如巨龙，预感到要出真龙天子与朱元璋争江山，于是施法设置七只石狸猫头在山塘街上。据说这七只狸有千斤巨锁功能，能牢固地锁住龙身，以此保住朱明江山传至万世万万世。</p>
                    </p>
                </div>
                <div className="sports-content-center">
                    <div className="erweima sports-content-center-left">
                        <img src="../images/limao.jpg" alt="七只狸猫" width="100" height="100"/>
                    </div>
                    <div className="sports-content-center-right">
                        <div>
                            带你静观人工智能风起云涌，花开花落，人工智能为你划重点。
                            <div>By.狸叔@七只狸猫</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>);
    }
}

export default Sports;