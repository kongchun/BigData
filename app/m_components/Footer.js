import React from 'react';
import {
    IndexLink
    } from 'react-router';
class Footer extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
                <div className="container-fluid">
                    <div className="nav-tab">
                            <IndexLink  to={'/'}  className="tab-item"  activeClassName="tab-item-active">
                                <div className="glyphicon glyphicon-th-list"></div>
                                <div>资讯</div>
                            </IndexLink>
                            <IndexLink  to={'/hotdot'} className="tab-item" activeClassName="tab-item-active">
                                <div className="glyphicon glyphicon-signal"></div>
                                <div>趋势</div>
                            </IndexLink>
                            <IndexLink to={'/sports'} className="tab-item" activeClassName="tab-item-active">
                                <div className="glyphicon glyphicon-globe"></div>
                                <div>专家</div>
                            </IndexLink>
                            <IndexLink to={'/myInfo'} className="tab-item" activeClassName="tab-item-active">
                                <div className="glyphicon glyphicon-user"></div>
                                <div>我的</div>
                            </IndexLink>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Footer;