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
        this.limit = 20;
    }

    componentDidMount() {
        console.log("ArticleList", "componentDidMount");

        ArticleListStore.listen(this.onChange);

        const page = this.props.params && this.props.params.page ? this.props.params.page : 1;
        ArticleListActions.getArticles(page, this.limit);
    }

    componentWillUnmount() {
        ArticleListStore.unlisten(this.onChange);
    }
    componentDidUpdate(prevProps) {
        const lastPage = prevProps.params && prevProps.params.page ? prevProps.params.page : 1;
        const page = this.props.params && this.props.params.page ? this.props.params.page : 1;
        if (lastPage != page) {
            ArticleListActions.getArticles(this.props.params.page, this.limit);
        } else {
            scroll(0, 0);
        }

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

        function subContent(str) {
            return str.substr(0, 200) + "...";
        }

        let articles = this.state.data.data;
        let artclelist = articles.map((article) => (
            <article key={article.id} id={article.id} className='post animated fadeIn'>
             <div className="post-head">
                  <h1 className="post-title"><Link to={'/article/' + article.id}>{article.title}</Link></h1>
            </div>
            {this.getThumbnail(article)}
             <div className="post-content">
                <p>{subContent(article.content)}</p>
            </div>
            <div className="post-permalink">
               <Link to={'/article/' + article.id} className="btn btn-default">阅读全文</Link>
            </div>
            </article>

        ));
        return (
            <section className="content-wrap">
            <div className="container">
                <div className="row">
                    <main className="col-md-12 main-content">
                        {artclelist}
                        <Pages page={this.state.data.page} limit={this.limit} count={this.state.data.count} url="#/page/"/>
                    </main>
                </div>
               
            </div>
            </section>
        );
    }
}

export default ArticleList;