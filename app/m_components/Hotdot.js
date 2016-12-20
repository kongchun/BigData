import React from 'react';
import {
    Link
    } from 'react-router';
import HotdotActions from '../actions/HotdotActions';
import HotdotObjStore from '../stores/HotdotObjStore';

class Hotdot extends React.Component {
    constructor(props) {
        super(props);
        this.state = HotdotObjStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        HotdotActions.getHotdotDatas();
        $(".month-search").hide();
        $(".navbar-hotdot").on("touchend",function(){
            var index = $(this).index();
            if(index==0){
                //本周
                $(".month-search").hide();
                $(".week-search").show();
            }else{
                //本月
                $(".month-search").show();
                $(".week-search").hide();
            }

        });
        HotdotObjStore.listen(this.onChange);
    }
    componentWillUnmount() {
        HotdotObjStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    getUpOrDown(curData,preData,isWeek){
        var preDataItem = isWeek ? preData.week:preData.month;
        if(preData==false || preData == [] || preDataItem==undefined){
            return (<span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>);
        }else{
            for(var i = 0;i < preDataItem.length;i++){
                if(preDataItem[i].word == curData.word){
                    if(preDataItem[i].value < curData.value){
                        return (<span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>);
                    }else{
                        return (<span className="glyphicon-trend glyphicon glyphicon-arrow-down"></span>);
                    }
                }
            }
        }
        return (<span className="glyphicon-trend glyphicon glyphicon-arrow-up"></span>);
    }
    render() {
        var hotdotData = (this.state.data);
        var firstHotData = hotdotData[0];
        var preHotData ;
        if(hotdotData.length > 7){
            preHotData = hotdotData[7];
        }else{
            preHotData = [];
        }
        if(firstHotData){
            var weekList = firstHotData.week.map((weekItem,i)=>(
                <li className="list-group-item" key={i}>
                    {this.getUpOrDown(weekItem,preHotData,true)}
                    <span className="badge">{weekItem.value}</span>
                    {weekItem.word}
                </li>
            ));
            var monthList = firstHotData.month.map((monthItem,i)=>(
                <li className="list-group-item" key={i}>
                    {this.getUpOrDown(monthItem,preHotData,false)}
                    <span className="badge">{monthItem.value}</span>
                    {monthItem.word}
                </li>
            ));
        }else{
            var weekList = (<span>暂时还没有排行榜呐,去其他地方转转吧</span>);
            var monthList = (<span>暂时还没有排行榜呐,去其他地方转转吧</span>);
        }

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
                                {weekList}
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
                                {monthList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
}
}

export default Hotdot;