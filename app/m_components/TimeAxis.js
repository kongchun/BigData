import React from 'react';
import {
    Link
    } from 'react-router';
class TimeAxis extends React.Component {

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    componentDidMount(){
        $(".main .year h2 a").click(function (e) {
            e.preventDefault();
            $(this).parents(".year").toggleClass("close");
        });
    }

    getContent(more){
        var i=0;
        let moreHtml = more.map(function(text){
            return (
                <p key={i++}>{text}</p>
            );
        });
        return (<more>
            {moreHtml}
        </more>);
    }

    getTimes(times){
        var that = this;
        var i=0;
        var timeHtml = times.map(function(time) {
            return (
                <time-detail key={i++}>
                    <p className="version">{time.version}</p>
                    <div className="more">
                        {that.getContent(time.more)}
                    </div>
                </time-detail>
            );
        });
        return (
            <time-group>
                {timeHtml}
            </time-group>
        )
    }

    getDays(days){
            var that = this;
        var i=0;
            var dayHtml = days.map(function(day){
                if(day.highlight){
                    return (
                    <li className="cls highlight" key={i++}>
                    <p className="date">{day.date}</p>
                    <p className="intro">{day.intro}</p>
                        {that.getTimes(day.times)}
                    </li>
                    );
                }else{
                    return (
                    <li className="cls" key={i++}>
                    <p className="date">{day.date}</p>
                    <p className="intro">{day.intro}</p>
                    </li>
                    );
                }
            });
            return (
            <div className="list">
                <ul>
                {dayHtml}
                </ul>
            </div>
            );
    }

    getYears(years){
            var that = this;
        var i=0;
            var yearHtml = years.map(function(year){
            return (
                <year key={i++}>
                    <h2><a >{year.year}<i></i></a></h2>
                    {that.getDays(year.days)}
                </year>
            );
           });

            return (<div className="year">
                {yearHtml}
                </div>
            );
    }


    render() {
        return (
            <div className="time-content">
                <div className="wrapper">
                    <div className="main">
                        <h1 className="title">{this.data.title}</h1>
                        {this.getYears(this.data.years)}
                    </div>
                </div>
            </div>
        );
    }

}

export default TimeAxis;