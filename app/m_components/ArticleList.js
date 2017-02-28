import React from 'react';
import {
    Link
    } from 'react-router';

import ArticleListStore from '../stores/ArticleListStore';
import ArticleListActions from '../actions/ArticleListActions';
import Pages from './Pages';
class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ArticleListStore.getState();
        this.onChange = this.onChange.bind(this);
        this.limit = 7;
        this.page = 1;
    }

    componentDidMount() {
        console.log("ArticleList", "componentDidMount");

        ArticleListStore.listen(this.onChange);

        const page = this.props.params && this.props.params.page ? this.props.params.page : 1;
        ArticleListActions.getArticles(page, this.limit);
        var that = this;
        $(".pagination").on('click',function(){
            that.setPage();
            ArticleListActions.getMoreArticles(that.getPage(), that.limit).then(
                    data => that.addNewArticle(data.data)
            );
        })
    }

    componentWillUnmount() {
        ArticleListStore.unlisten(this.onChange);
    }

    //componentDidUpdate(prevProps) {
    //    const lastPage = prevProps.params && prevProps.params.page ? prevProps.params.page : 1;
    //    const page = this.props.params && this.props.params.page ? this.props.params.page : 1;
    //    if (lastPage != page) {
    //        ArticleListActions.getArticles(this.props.params.page, this.limit);
    //    } else {
    //        scroll(0, 0);
    //    }
    //
    //}

    onChange(state) {
        this.setState(state);

    }

    getPage() {
        return this.page
    }
    setPage() {
        this.page = this.page + 1;
    }

    getThumbnail(article) {
        var thumbnail = article.thumbnail;
        if (thumbnail != "") {
            return (<div className="featured-media">
                <Link to={'/article/' + article.id}><img src={thumbnail} alt={article.title}/></Link>
            </div>)
        }
        return "";
    }
    addNewArticle(news){
        this.setState({
            data:{
                data:this.state.data.data.concat(news)
            }});
    }
    render() {
        function subContent(str) {
            return str.substr(0, 200);
        }

        let articles = this.state.data.data;
        let artclelist = articles.map((article) => (
            <article id={article.id} className='post animated fadeIn'>

                {this.getThumbnail(article)}
                <div className="intro">
                    <div className="post-head">
                        <h3 className="post-title"><Link to={'/article/' + article.id}>{article.title}</Link></h3>
                    </div>
                    <div className="post-content">
                        <p>{subContent(article.content)}</p>
                    </div>
                </div>
            </article>

        ));
        return (
            <section className="content-wrap">
                <div className="container">
                    <div className="row list">
                        <main className="col-md-12 main-content ">
                            {artclelist}
                        </main>
                        <ul className="pagination">
                            <li>
                                再来七篇
                            </li>
                        </ul>
                    </div>

                </div>
            </section>
        );
    }
}

export default ArticleList;