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

import App from './components/App';
import Home from './components/Home';
import Article from './components/Article';
import ArticleList from './components/ArticleList';
import MyCollection from './components/MyCollection';


export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home}/>
    	<Redirect from="home" to="page/1" />
   		<Route path="page/:page" component={ArticleList} />
   		<Route path="article/:id" component={Article} />
   		<Route path="myCollection" component={MyCollection} />
    </Route>
  </Router>
)