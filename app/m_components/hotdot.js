import React from 'react';
import {
    Link
    } from 'react-router';


class Hotdot extends React.Component {
    componentDidMount(){
        $(".month-search").hide();
        $(".navbar-hotdot").on("touchend",function(){
            var index = $(this).index();
            /*$(".navbar-hotdot").removeClass("navbar-hotdot-active");
            $(this).addClass("navbar-hotdot-active");*/
            if(index==0){
            //本周
                $(".month-search").hide();
                $(".week-search").show();
            }else{
            //本月
                $(".month-search").show();
                $(".week-search").hide();
            }

        })
    }
    render() {
    return (
        <div className="content-container">

            <div className="week-search">
                <div className="panel panel-back">
                    <div className="panel-heading">
                        <span className="panel-title">本周关键字排行榜</span>
                        <div className="navbar-key-container">
                            <span className="navbar-hotdot navbar-week navbar-hotdot-active">本周</span>
                            <span className="navbar-hotdot navbar-month">本月</span>
                        </div>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">4356</span>
                                人工智能
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">2345</span>
                                机器学习
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">1667</span>
                                吴恩达
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">899</span>
                                十大算法
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">600</span>
                                KNN算法
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">47788</span>
                                人脸识别
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">22365</span>
                                自动驾驶
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">8967</span>
                                Google
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">4322</span>
                                深度学习
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">3456</span>
                                神经网络
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="month-search">
                <div className="panel panel-back">
                    <div className="panel-heading">
                        <span className="panel-title">本月关键字排行榜</span>
                        <div className="navbar-key-container">
                            <span className="navbar-hotdot navbar-week">本周</span>
                            <span className="navbar-hotdot navbar-month navbar-hotdot-active">本月</span>
                        </div>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">47788</span>
                                人脸识别
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">22365</span>
                                自动驾驶
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">8967</span>
                                Google
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">4322</span>
                                深度学习
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">3456</span>
                                神经网络
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">47788</span>
                                人脸识别
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">22365</span>
                                自动驾驶
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">8967</span>
                                Google
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>
                                <span className="badge">4322</span>
                                深度学习
                            </li>
                            <li className="list-group-item">
                                <span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>
                                <span className="badge">3456</span>
                                神经网络
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default Hotdot;