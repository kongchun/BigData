import React from 'react';
import {
    Link
    } from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';

class Sports extends React.Component {

    render() {
        var liyu = new Array();
        liyu[0] = "生命中许多的错失，是因为我们不坚持、不努力、不挽留，欺骗自己说一切都是命运。殊不知命运再好，都要经历风雨和黑暗。";
        liyu[1] = "强势的人未必是强者。一个真正聪明的人，是懂得如何让自己委屈求全的人。";
        liyu[2] = "每个人曾经都是胜利者。遇到挫折，不要灰心气馁。得到成功，不要骄傲自大。";
        liyu[3] = "把事情办好的秘密就是行动。成功之路就是有条理思考之后的行动！行动！行动！";
        liyu[4] = "失败，是把有价值的东西毁灭给人看；成功，是把有价值的东西包装给人看";
        liyu[5] = "少要求一点别人，多要求一下自己；少强求一下生活，多奉献一份真诚；少一份追逐，多一份平和。";
        liyu[6] = "缘聚缘散，犹如云烟，生离死别，天道自然。想一想，有多少已经不联系的朋友，默默地存在于你的通讯录中。";
        liyu[7] = "宽容，再宽容，你会温文尔雅。做一个低调的人，不需言语，别人也能看见你的美丽，低调做人，淡定从容。";
        liyu[8] = "我们这一生，要走很多条路，有笔直坦途，有羊肠阡陌；有繁华，也有荒凉。无论如何，路要自己走，苦要自己吃。";
        liyu[9] = "人生是个圆，有的人走了一辈子也没有走出命运画出的圆圈，其实，圆上的每一个点都有一条腾飞的切线。";
        liyu[10] = "命运掌握在自己手中。要么你驾驭生命，要么生命驾驭你，你的心态决定你是坐骑还是骑手。";
        liyu[11] = "不要拿小人的错误来惩罚自己，不要在这些微不足道的事情上折磨浪费自己的宝贵时间。";
        liyu[12] = "人一生下就会哭，笑是后来才学会的。所以忧伤是一种低级的本能，而快乐是一种更高级的能力。";
        liyu[13] = "放弃该放弃的是无奈，放弃不该放弃的是无能，不放弃该放弃的是无知，不放弃不该放弃的是执著！";
        liyu[14] = "你把周围的人看作魔鬼，你就生活在地狱；你把周围的人看作天使，你就生活在天堂。";
        liyu[15] = "一杯清水因滴入一滴污水而变污浊，一杯污水却不会因一滴清水的存在而变清澈。";
        liyu[16] = "如果你能像看别人缺点一样，如此准确的发现自己的缺点，那么你的生命将会不平凡。";
        liyu[17] = "无论你觉得自己多么的了不起，也永远有人比你更强；无论你觉得自己多么的不幸，永远有人比你更加不幸。";
        liyu[18] = "只有你学会把自己已有的成绩都归零，才能腾出空间去接纳更多的新东西，如此才能使自己不断的超越自己。";
        liyu[19] = "笑对人生，能穿透迷雾；笑对人生，能坚持到底；笑对人生，能化解危机；笑对人生，能照亮黑暗。";
        liyu[20] = "人生最大的悲哀不是失去太多，而是计较太多，这也是导致一个人不快乐的重要原因。";
        liyu[21] = "人的一生就像一篇文章，只有经过多次精心修改，才能不断完善。摘自：读书名言";
        liyu[22] = "虽然我们无法改变人生，但可以改变人生观。虽然我们无法改变环境，但我们可以改变心境。";
        liyu[23] = "如果你还认为自己还年轻，还可以蹉跎岁月的话，你终将一事无成，老来叹息。";
        liyu[24] = "当你快乐时，你要想，这快乐不是永恒的。当你痛苦时，你要想，这痛苦也不是永恒的。";
        liyu[25] = "激情，这是鼓满船帆的风。风有时会把船帆吹断；但没有风，帆船就不能航行。";
        liyu[26] = "不管从什么时候开始，重要的是开始以后不要停止；不管在什么时候结束，重要的是结束以后不要后悔。";
        liyu[27] = "每个人都有潜在的能量，只是很容易被习惯所掩盖，被时间所迷离，被惰性所消磨。";
        liyu[28] = "积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。";
        liyu[29] = "同样的瓶子，你为什么要装毒药呢？同样的心理，你为什么要充满着烦恼呢？";
        liyu[30] = "在必要时候需要弯一弯，转一转，因为太坚强容易折断，我们需要更多的柔软，才能战胜挫折。";
        liyu[31] = "人生就像一个动物园，当你以为你在看别人耍猴的时候，却不知自己也是猴子中的一员！";
        liyu[32] = "你不能左右天气，但可以改变心情。你不能改变容貌，但可以掌握自己。你不能预见明天，但可以珍惜今天。";
        liyu[33] = "如果我们有着快乐的思想，我们就会快乐；如果我们有着凄惨的思想，我们就会凄惨。";
        liyu[34] = "不要因为自己还年轻，用健康去换去金钱，等到老了，才明白金钱却换不来健康。";

        function getLiyu(liyu){
            var num =parseInt(Math.random()*35);
            return liyu[num].toString();
        }

        return (<div>
            <div className="sports-content-wrap">
                <div className="sports-content-top">
                    <div id="myCarousel" className="carousel slide">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
                            <li data-target="#myCarousel" data-slide-to="4"></li>
                            <li data-target="#myCarousel" data-slide-to="5"></li>
                            <li data-target="#myCarousel" data-slide-to="6"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="item">
                                <img src="../images/meiren.png" alt="美仁狸"/>
                                <div className="carousel-caption">美仁狸
                                </div>
                            </div>
                            <div className="item">
                                <img src="../images/tonggui.png" alt="通贵狸"/>
                                <div className="carousel-caption">通贵狸
                                </div>
                            </div>
                            <div className="item">
                                <img src="../images/wenxing.png" alt="文星狸"/>
                                <div className="carousel-caption">文星狸</div>
                            </div>

                            <div className="item">
                                <img src="../images/caiyun.png" alt="彩云狸"/>
                                <div className="carousel-caption">彩云狸</div>
                            </div>

                            <div className="item">
                                <img src="../images/xiaobai.png" alt="白公狸"/>
                                <div className="carousel-caption">白公狸</div>
                            </div>

                            <div className="item">
                                <img src="../images/haiyong.png" alt="海涌狸"/>
                                <div className="carousel-caption">海涌狸</div>
                            </div>

                            <div className="item active">
                                <img src="../images/fenshui.png" alt="分水狸"/>
                                <div className="carousel-caption">分水狸</div>
                            </div>

                         </div>
                        <a className="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                        <a className="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
                    </div>
                </div>
                <div className="sports-content-bottom">
                    <p className="sports-content-bottom-wrap">
                        <div className="sports-content-address"><span className="title">【七只狸猫】</span><div className="address"><i className='glyphicon glyphicon-map-marker'></i>中国·苏州·七里山塘</div></div>
                        <p>相传，明朝初年刘伯温来苏州时，感到山塘河长贯卧伏在白堤前，状如巨龙，善于阴阳占卜的刘伯温预感到将与朱元璋争江山，要出真龙天子，他就施法在山塘桥至西山庙桥沿途的七座石级拱桥对直处分别设置了一只青石狸头。青石狸状如卧龙，设置七只石狸猫头在山塘街上，并分别予以名号传说七狸有千斤巨锁之功，能牢固地永久锁住龙身，朱明江山就可传至万世万万世了，并赋予美名“美仁狸”,在山塘桥畔;“通贵狸”,在通贵桥畔;“文星狸”,在星桥畔;“彩云狸”,在彩云桥畔;“海涌狸”,在青山桥畔;“分水狸”,在西山庙桥畔;“白公狸”,在普济桥畔。据说这七只狸有千斤巨锁功能，能牢固地锁住龙身，刘伯温以破坏风水，达到整治目的。当时，在这些桥堍都有一家豆腐店，据说为狸喜食豆腐而专门设置,狸至三更深夜出来觅食。</p>
                    </p>
                </div>
                <div className="sports-content-center">
                    <div className="erweima sports-content-center-left">
                        <img src="../images/limao.jpg" alt="七只狸猫" width="100" height="100"/>
                    </div>
                    <div className="sports-content-center-right">
                        <div>带你静观人工智能风起云涌<div>花开花落.</div>
                            <div>【-我是狸叔砖家】</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>);
    }
}

export default Sports;