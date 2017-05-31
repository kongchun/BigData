import React from 'react';
import {
    Link
    } from 'react-router';
import UserStoreActions from './../actions/UserStoreActions';
import UserStore from './../stores/UserStore';
import SideColumn from './SideColumn';
class MyCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.onChange = this.onChange.bind(this);
        this.url = location.href.split('#')[0];
        this.maxShowLength = 150;
    }
    onChange(state) {
        this.setState(state);
    }
    componentDidMount(){
        $(".active").removeClass("active");
        $("#myCollection").parent().addClass("active");

        this.bindGetMoreDetailEvent();
    }
    componentWillMount(){
        /**
         * 1.根据名称查询当前用户的信息
         * 2.根据查询到的Id去查询文章内容
         * */
        UserStore.listen(this.onChange);
        UserStoreActions.getUser();
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

    getThumbnail(article) {
        var thumbnail = article.thumbnail;
        if (thumbnail != "") {
            return (<div className="featured-media">
                <Link to={'/article/' + article.articleId}><img src={thumbnail} alt={article.articleTitle} /></Link>
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

        function markTag(tags){
            return tags.map((tag) => (
                <span className="article-tag">{tag}</span>
            ))
        }
        let articles = this.state.data.collect;
        let artclelist = articles.map(function(article) {
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
                                        <h5 title={article.articleTitle}><a href={that.url+'#/article/'+article.articleId} target="_blank">{article.articleTitle}</a></h5>
                                        <span className={iconClass}></span>
                                    </div>
                                    <div className="col-xs-12 pc-card-tags">
                                        <p>
                                            <span className="cd-view-time cd-tag-icon" style={{width:'140px'}}>{article.collectTime}</span>
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
export default MyCollection;
