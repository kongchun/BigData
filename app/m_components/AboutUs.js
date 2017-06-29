import React from 'react';
import {
	Link
} from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
import TimeAxis from './TimeAxis';
class AboutUs extends React.Component {

    componentDidMount(){
        $("#lastPageButton").show();
        $(".footer-nav").hide();
        var deviceWidth = document.documentElement.clientWidth;
        var leftB = (deviceWidth-290)/2;
        if(leftB<0){
            leftB = 0;
        }
        $("html,body").animate({scrollTop: 0}, 10);
        $(".timeHistory").css("padding-left",leftB+"px");
    }

    componentWillUnmount() {
        $(".footer-nav").show();
    }

	render() {
        //<div>很久很久以前,这是一个神秘的故事...</div>
        var data = {
            title :"成长日记",
            years : [
                {
                    year:"2017年",
                    days:[
                        {
                            date: "5月30日",
                            highlight: true,
                            intro: "七只狸猫·端午快讯",
                            times:[
                                {
                                    version:"成立",
                                    more: [
                                        "出生于丁酉年端午时节，五行缺粽子，故起名端午。不端不正，勤勉好学。"
                                    ]
                                },
                                {
                                    version:"目标",
                                    more: [
                                        "每天十分钟阅读人工智能科技资讯-用科技视角看世界。"
                                    ]
                                },
                                {
                                    version:"意图",
                                    more: [
                                        "应用机器学习技术帮你最少时间了解最高质量人工智能行业资讯。"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }


		return (<div>
            <div className="aboutusStyle">
                <img src="images/aboutus.jpg"/>
                <span>荒野猎人团队</span>
            </div>
            <div className="timeHistory">
            <TimeAxis data={data}/>
            </div>
		</div>)
	}
}


export default AboutUs;