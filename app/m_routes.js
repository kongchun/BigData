import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
    Link,
    Redirect
    } from 'react-router';

import App from './m_components/App';
import Home from './m_components/Home';
import Article from './m_components/Article';
import ArticleList from './m_components/ArticleList';


export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Redirect from="home" to="page/1" />
            <Route path="page/:page" component={ArticleList} />
            <Route path="article/:id" component={Article} />
        </Route>
    </Router>
)