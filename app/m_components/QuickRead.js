import React from 'react';
import {
    Link
    } from 'react-router';
import {
    browserHistory
    } from 'react-router';
import ArticleSimpleStore from '../stores/ArticleSimpleStore';
import ArticleListActions from '../actions/ArticleListActions';
import ArticleCollect from './ArticleCollect';
import Weixin from './Weixin';
class QuickRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = ArticleSimpleStore.getState();
        this.onChange = this.onChange.bind(this);
        this.limit = 7;
        this.page = props.params && props.params.page ? parseInt(props.params.page) : 1;
        this.stop = true;
        this.maxShowLength = 97;
        this.url = window.location.href;
        if(this.url.indexOf("?_k")!=-1){
            this.url = this.url.split("?_k")[0];
        }
        this.pagePath = window.sessionStorage.getItem("quick_data_pagePath");
    }

    componentDidMount() {
        console.log("QuickRead", "componentDidMount");
        ArticleSimpleStore.listen(this.onChange);
        var that = this;
        var data = window.sessionStorage.getItem("quick_data");

        if(!!data){
            this.state.data = JSON.parse(data);
            this.setData(JSON.parse(data));
            var pagePath = window.sessionStorage.getItem("quick_data_pagePath");
            if(!!pagePath && "null"!=pagePath){
                browserHistory.push(pagePath);
                this.page = parseInt(window.sessionStorage.getItem("quick_data_pageNum"));
            }
            var transformIndex = window.sessionStorage.getItem("QuickRead_urlScroll_"+this.url);
            if(!!transformIndex){
                $("html,body").animate({scrollTop: transformIndex}, 10);
            }
        }else{
            const page = 1;
            ArticleListActions.getArticles(page, this.limit);
            $("html,body").animate({scrollTop: 0}, 10);
        }
        $(window).scroll(function() {
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if ($(this).scrollTop() + $(window).height() + 100 >= $(document).height() && $(this).scrollTop() > 100) {
                if(that.stop==true){
                    that.stop=false;
                    //加载提示信息
                    $("#cd-card-view").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                    that.setPage();
                    browserHistory.push('#/quickRead/'+that.page)
                    that.pagePath='#/quickRead/'+that.page;
                    ArticleListActions.getMoreArticles(that.getPage(), that.limit).then(
                            data => that.addNewArticle(data.data)
                    );
                }
            }
        });
        this.bindGetMoreDetailEvent();
        Weixin.getUrl();
        Weixin.weixinReady()
    }

    componentWillUnmount() {
        window.sessionStorage.removeItem("quick_data_pagePath");
        window.sessionStorage.setItem("quick_data_pagePath",this.pagePath);
        window.sessionStorage.removeItem("quick_data_pageNum");
        window.sessionStorage.setItem("quick_data_pageNum",this.page);
        window.sessionStorage.removeItem("quick_data");
        window.sessionStorage.setItem("quick_data",JSON.stringify(this.state.data));
        window.sessionStorage.removeItem("QuickRead_urlScroll_"+this.url);
        window.sessionStorage.setItem("QuickRead_urlScroll_"+this.url,document.body.scrollTop);
        $(window).unbind('scroll');
        ArticleSimpleStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    bindGetMoreDetailEvent(){
        $("#cd-card-view").on('click','.to-get-quick-more',function(){
            $(this).hide();
            $($(this).parent().children()[0]).hide();
            $($(this).parent().children()[2]).show();
        })
        $("#cd-card-view").on('click','.close-get-quick-more',function(){
            $($(this).parent()).hide();
            $($(this).parent().parent().children()[0]).show();
            $($(this).parent().parent().children()[1]).show();
        })
    }

    getPage() {
        return this.page
    }
    setPage() {
        this.page = this.page + 1;
    }

    setData(news){
        this.setState({
            data:{
                data:news.data,
                count:news.count
            }});
    }

    addNewArticle(news){
        $(".spinner").remove();
        this.setState({
            data:{
                data:this.state.data.data.concat(news)
            }});
        this.stop=true;
    }
    render() {
        let that = this;
        function subContent(str) {
            var len = str.length;
            if(len>that.maxShowLength){
                len = that.maxShowLength;
            }
            return str.substr(0, that.maxShowLength);
        }
        function subContent2(str) {
            var len = str.length;
            if(len>that.maxShowLength){
                return str.substr(that.maxShowLength);
            }else{
                return "";
            }
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
        function showTagIcon(tags){
            if(!!tags && tags.length>0){
                return (
                    <icon className="glyphicon glyphicon-tags cd-tag-icon"></icon>
                );
            }
            return "";
        }
        function markTag(tags){
            return tags.map((tag) => (
                <span className="article-tag2">{tag}</span>
            ))
        }
        let articles = this.state.data.data;
        let cookie;
        if(document.cookie.split("articles=")[1] && document.cookie.split("articles=")[1] != ""){
            cookie = JSON.parse(unescape(document.cookie.split("articles=")[1].split(";")[0]))
        }else{
            cookie = []
        }
        let cookie_art = new Set(cookie);
        let artclelist = articles.map(function(article){
            let title_class = "cd-read-more";
            let content_read_class = "";
            if(cookie_art.has(article.id)){
                title_class = "cd-read-more cd-btn-read";
                content_read_class = "cd-content-read";
            }
            var tagsLen = article.tags.length;
            let tagsPClassName = "";
            var currentTags = [];
            if(tagsLen>0){
                tagsPClassName = "cd-tags-p";
                if(tagsLen>4){
                    for(var i=0;i<4;i++){
                        currentTags.push(article.tags[i]);
                    }
                }else{
                    currentTags = article.tags;
                }
            }else{
                tagsPClassName = "quick-more-hide";
            }
            var strLen = article.smartSummary.length;
            let openClassName = "";
            let moreDotClassName = "";
            let moreContentClassName = "";
            let closeClassName = "";
            if(strLen>that.maxShowLength){
                openClassName = "to-get-quick-more "+content_read_class;
                moreDotClassName = "";
                moreContentClassName = "quick_more_content quick-more-hide "+content_read_class;
                closeClassName = "close-get-quick-more "+content_read_class;
            }else{
                openClassName = "quick-more-hide";
                moreDotClassName = "quick-more-hide";
                moreContentClassName = "quick-more-hide";
                closeClassName = "quick-more-hide";
            }//<Link to={'/article/' + article.id} className={title_class}>阅读全文</Link>
            let cdContentHeadClass = 'cd-content-head ' + content_read_class;
            return (<div className="cd-timeline-block">
                        <div className="cd-timeline-content">
                            <p className={cdContentHeadClass}>{article.title}</p>
                            <p className={tagsPClassName}>
                                <icon className="glyphicon glyphicon-tags cd-tag-icon"></icon>
                                {markTag(currentTags)}
                            </p>
                            <div className="quick-pic-view" style={{display:'none'}}>
                                <img src={article.thumbnail} alt={article.title} />
                            </div>
                            <p className={content_read_class}>
                                {subContent(article.smartSummary)}
                                <span className={moreDotClassName}>...</span>
                                <span className={openClassName}>&nbsp;全部摘要</span>
                                <span className={moreContentClassName}>
                                    {subContent2(article.smartSummary)}
                                    <span className={closeClassName}>&nbsp;收缩</span>
                                </span>
                            </p>

                            <icon className="glyphicon glyphicon-eye-open cd-view-icon" style={{display:'none'}}></icon>
                            <span className="cd-view-count" style={{display:'none'}}>{article.hits}</span>
                            <icon className="glyphicon glyphicon-time cd-view-icon"></icon>
                            <span className="cd-view-time">{readTime(article.createDate)}</span>
                        </div>
                        <div className="cd-content-toolbar">
                            <ArticleCollect showFlag='1' articleId={article.id} articleTitle={article.title} articleSmartSummary={article.smartSummary} tags={article.tags} articleThumbnail={article.thumbnail}/>
                            <Link to={'/article/' + article.id} ><span className="miconfont micon-text cd-content-toolbar-font">&nbsp;阅读全文</span></Link>
                        </div>
                    </div>)
        });
    return (
        <section id="cd-card-view" className="cd-container">
            {artclelist}
        </section>
    );
    }
}


export default QuickRead;