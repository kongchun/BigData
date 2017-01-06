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
import Hotdot from './m_components/Hotdot';
import Sports from './m_components/Sports';
import MyInfo from './m_components/MyInfo';
import Collection from './m_components/Collection';
import Note from './m_components/MyNote';
import FedBack from './m_components/FedBack';
import AboutUs from './m_components/AboutUs';
export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Redirect from="home" to="page/1" />
            <Route path="page/:page" component={ArticleList} />
            <Route path="article/:id" component={Article} />
            <Route path="hotdot" component={Hotdot} />
            <Route path="sports" component={Sports} />
            <Route path="myInfo" component={MyInfo} />
            <Route path="collection" component={Collection} />
            <Route path="note" component={Note} />
            <Route path="fedBack" component={FedBack} />
            <Route path="aboutUs" component={AboutUs} />
        </Route>
    </Router>
)