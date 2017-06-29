import React from 'react';
import ReactDOM from 'react-dom';
import ArticleSimpleStore from '../stores/ArticleSimpleStore';
import ArticleListActions from '../actions/ArticleListActions';

class Weekly extends React.Component {

    constructor(props) {
        super(props);
        this.state = ArticleSimpleStore.getState();
        this.onChange = this.onChange.bind(this);
        this.page = props.params && props.params.page ? parseInt(props.params.page) : 1;
        this.limit = props.params && props.params.limit ? parseInt(props.params.limit) : 7;
        this.time = props.params? parseInt(props.params.time) : '';
        this.week = "";
        this.setLocationPath();
    }

    setLocationPath(){
        var urls = window.location.href.split("?");
        if(!!urls && urls.length>1){
            var params = urls[1].split("&");
            if(!!params && params.length>0){
                for(var i=0;i<params.length;i++){
                    var param = params[i].split("=");
                    if("page"==param[0] && param.length>1){
                        this.page = param[1];
                    }
                    if("limit"==param[0] && param.length>1){
                        this.limit = param[1];
                    }
                    if("time"==param[0] && param.length>1){
                        this.time = param[1];
                    }
                    if("week"==param[0] && param.length>1){
                        this.week = param[1];
                    }
                }
            }
        }
    }

    componentDidUpdate(){
        $('#ll-news').fullpage({
            sectionsColor: ['#A0C4FA', '#86ADEA', '#6C95DB', '#5281CB', '#3E6FB9', '#2958A0', '#1A4689', '#0D3676', '#032967', '#003E7C','#176ABF'],
            'navigation': true,
            'resize':true,
            'loopBottom':true,
            'css3':true,
            'paddingTop':0
        });
    }

    componentDidMount() {
        ArticleSimpleStore.listen(this.onChange);
        ArticleListActions.getArticlesByHits(this.page, this.limit, this.time);
	}

    onChange(state) {
        this.setState(state);
    }


	render() {
        var week = this.week;
        if(!!week){
            week = '第'+week+'周';
        }
        var articles = this.state.data.data;
        if(!!!articles){
            return (
                <div id="ll-news">
                    关注公众号“七只狸猫”，用人工智能技术帮你每天获取最有价值的人工智能资讯
                </div>
            );
        }
        var listInfoIndex = 1;
        var listinfo = articles.map(function(article){
            return (
                <span key={listInfoIndex}>{listInfoIndex++}、{article.title}</span>
            )
        });
		function getHeadInfo(){
			return (
				<div className="section ll-limao-info">
					<p className="ll-list-1">
						{week}人工智能简报
					</p>
					<p className="ll-list-2">
                        {listinfo}
					</p>
				</div>
			)
		}

        function getFooterInfo(){
            return (
                <div className="section">
                    <img className="ll-limao-logo" src="/images/logo_banner3.png" />
                    <img className="ll-limao-code" src="/images/limao.jpg" />
                    <a href="http://www.limaodata.com"><span className="go-to-index">了解更多</span></a>
                </div>
            )
        }
        //
        var cc = 0;
        let contentNews = articles.map(function(article){
            var divImage = {
                backgroundImage :"url('"+article.thumbnail+"')"
            };//<img src={article.thumbnail} />
            return (
                <div className="section" key={cc++} >
                    <div className="ll-p-0"><p className="ll-p-1" style={divImage}>

                    </p></div>
                    <p className="ll-p-2">
                        {article.title}
                    </p>
                    <div className="ll-p-0"><p className="ll-p-3">&nbsp; {article.smartSummary}</p></div>
                </div>
            )
        });
		return (
            <div id="ll-news">
                {getHeadInfo()}
                {contentNews}
                {getFooterInfo()}
     		</div>
		);
	}
}

export default Weekly;

$(function(){
    var appRoot = document.getElementById('app_sp');
    if(!!appRoot){
        ReactDOM.render(<Weekly />, document.getElementById('app_sp'));
    }
})