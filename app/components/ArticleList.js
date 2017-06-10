import React from 'react';
import {
    Link
} from 'react-router';

import ArticleListStore from '../stores/ArticleListStore';
import ArticleListActions from '../actions/ArticleListActions';
import Pages from './Pages';
import SideColumn from './SideColumn';
import Weixin from './Weixin';


class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ArticleListStore.getState();
        this.onChange = this.onChange.bind(this);
        this.limit = 10;
        this.stop = true;
        this.page = props.params && props.params.page ? parseInt(props.params.page) : 1;
        this.maxShowLength = 150;
        this.url = location.href.split('#')[0];
        this.autoLoadCount = 6;
    }

    componentDidMount() {
        Weixin.updateUrlCode();
        console.log("ArticleList", "componentDidMount");
        $(".active").removeClass("active");
        $("#quickRead").addClass("active");
        ArticleListStore.listen(this.onChange);

        const page = this.props.params && this.props.params.page ? this.props.params.page : 1;
        ArticleListActions.getArticles(page, this.limit);
        var that =this;
        $(window).scroll(function() {
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if ($(this).scrollTop() + $(window).height() + 50 >= $(document).height() && $(this).scrollTop() > 100) {
                if(that.stop==true){
                    that.stop=false;
                    //加载提示信息
                    $(".pc-center-box").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                    ArticleListActions.getMoreArticles(++that.page, that.limit).then(
                            data => that.addNewArticle(data.data)
                    );
                }
            }
        });
        this.bindGetMoreDetailEvent();
    }

    componentWillUnmount() {
        ArticleListStore.unlisten(this.onChange);
        $(window).unbind('scroll');
    }
    componentDidUpdate(prevProps) {
        const lastPage = prevProps.params && prevProps.params.page ? prevProps.params.page : 1;
        const page = this.props.params && this.props.params.page ? this.props.params.page : 1;
        if (lastPage != page) {
            ArticleListActions.getArticles(this.props.params.page, this.limit);
        } else {
            //scroll(0, 0);
        }

    }
    addNewArticle(news){
        $(".spinner").remove();
        this.setState({
            data:{
                data:this.state.data.data.concat(news)
            }});
        if(this.autoLoadCount>0){
            this.autoLoadCount--;
        }else{
            $(window).unbind('scroll');
            $(".pc-center-box").append("<div class='pc-click-get-more'><p>点击加载更多</p></div>");
        }
        this.stop=true;
    }
    bindGetMoreDetailEvent(){
        var that = this;
        $("#pc-body-box").on('click','.pc-click-get-more',function(){
            if(that.stop==true){
                that.stop=false;
                $(".pc-click-get-more").remove();
                //加载提示信息
                $(".pc-center-box").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                ArticleListActions.getMoreArticles(++that.page, that.limit).then(
                        data => that.addNewArticle(data.data)
                );
            }
        });
        $("#pc-body-box").on('click','.open-close-icon-act',function(){
            var pNode = $(this).parent().parent().find(".pc-card-info p");
            var currentHtml = pNode.html();
            var attrHtml = pNode.attr("data-p-text");
            if(!!attrHtml){
                pNode.html(attrHtml);
                pNode.attr("data-p-text",currentHtml);
                if($(this).parent().find(".glyphicon-chevron-down").length>0){
                    $(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
                }else if($(this).parent().find(".glyphicon-chevron-up").length>0){
                    $(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
                }
            }
        });
        $(".pc-center-box").on('click','.pc-card-info-act',function(){
            var pNode = $(this).parent().find(".pc-card-info p");
            var currentHtml = pNode.html();
            var attrHtml = pNode.attr("data-p-text");
            if(!!attrHtml){
                pNode.html(attrHtml);
                pNode.attr("data-p-text",currentHtml);
                if($(this).parent().find(".glyphicon-chevron-down").length>0){
                    $(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
                }else if($(this).parent().find(".glyphicon-chevron-up").length>0){
                    $(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
                }
            }
        });
    }
    onChange(state) {
        this.setState(state);

    }
    getPage() {
        return this.props.params && this.props.params.page ? this.props.params.page : 1;
    }

    getThumbnail(article) {
        var thumbnail = article.thumbnail;
        if (thumbnail != "") {
            return (<div className="featured-media">
                <Link to={'/article/' + article.id}><img src={thumbnail} alt={article.title} /></Link>
             </div>)
        }
        return "";
    }
    render() {
        var that = this;
        function subContent(str) {
            if(str.length>that.maxShowLength){
                return str.substr(0, that.maxShowLength)+'...';
            }
            return str;
        }
        function readTime(time){

            //let data = new Date(time);
            let diff = (new Date().getTime() - parseInt(time))/1000;
            let aDate = 86400;
            let aHour = 3600;
            if(diff < aHour){
                let minute = Math.ceil(diff/36);
                return minute + "分钟前"
            }
            if(diff < aDate){
                let hour = parseInt(diff/aHour);
                return hour + "小时前"
            }
            if(diff < 2*aDate){
                return "1天前"
            }
            if(diff < 3*aDate){
                return "2天前"
            }
            if(diff < 4*aDate){
                return "3天前"
            }
            if(diff < 5*aDate){
                return "4天前"
            }
            if(diff < 6*aDate){
                return "5天前"
            }
            if(diff < 7*aDate){
                return "6天前"
            }
            if(diff < 8*aDate){
                return "7天前"
            }
            if(diff < aDate*30){
                return "7天以前"
            }
            if(diff < aDate*60){
                return "一个月前"
            }
            return "a天前";
        }
        function markTag(tags){
            return tags.map((tag) => (
                <span className="article-tag">{tag}</span>
            ))
        }
        let cookie;
        if(document.cookie.split("articles=")[1] && document.cookie.split("articles=")[1] != ""){
            cookie = JSON.parse(unescape(document.cookie.split("articles=")[1].split(";")[0]))
        }else{
            cookie = []
        }
        let cookie_art = new Set(cookie);
        let articles = this.state.data.data;
        let artclelist = articles.map(function(article) {
            let title_class = "title_link";
            var hasread = false;
            if(cookie_art.has(article.id)){
                title_class = "title_link read";
                hasread = true;
            }
            if(!!!article.tags) article.tags=[];
            if(!!!article.smartSummary) article.smartSummary='';
            var tagsLen = article.tags.length;
            var tagsPClassName = "glyphicon glyphicon-tags cd-tag-icon";
            var currentTags = [];
            var iconClass= "glyphicon glyphicon-chevron-down open-close-icon open-close-icon-act";
            var textClass= "col-xs-12 pc-card-info pc-card-info-act";
            if(article.smartSummary.length<=that.maxShowLength){
                iconClass= "glyphicon glyphicon-chevron-down open-close-icon hide";
                textClass= "col-xs-12 pc-card-info";
            }
            if(hasread){
                textClass += " read";
            }
            if(tagsLen>0){
                if(tagsLen>4){
                    for(var i=0;i<4;i++){
                        currentTags.push(article.tags[i]);
                    }
                }else{
                    currentTags = article.tags;
                }
            }else{
                tagsPClassName = "glyphicon glyphicon-tags cd-tag-icon hide";
            }
            return (
                <article key={article.id} id={article.id} className='animated fadeIn'>
                    <li>
                        <div className="container pc-article-card">
                            <div className="row">
                                <div className="col-xs-3 pc-card-pic hide">
                                    {that.getThumbnail(article)}
                                </div>
                                <div className="col-xs-9">
                                    <div className="col-xs-12 pc-card-title">
                                        <h5 title={article.title}><a className={title_class} href={that.url+'#/article/'+article.id} target="_blank">{article.title}</a></h5>
                                        <span className={iconClass}></span>
                                    </div>
                                    <div className="col-xs-12 pc-card-tags">
                                        <p>
                                            <span className="cd-view-time cd-tag-icon">{readTime(article.createDate)}</span>
                                            <span className={tagsPClassName}></span>
                                            {markTag(currentTags)}
                                        </p>
                                    </div>
                                    <div className={textClass}>
                                        <p data-p-text={article.smartSummary}>
                                            {subContent(article.smartSummary)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                </article>
            );
        });

        return (
            <div className="container pc-body">
                <div className="row" id="pc-body-box">
                    <div className="col-xs-9 pc-center-box">
                        <section>
                            <ul>
                                {artclelist}
                            </ul>
                        </section>
                    </div>
                    <SideColumn />
                </div>
            </div>
        );
    }
}

export default ArticleList;