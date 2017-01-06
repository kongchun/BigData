import React from 'react';
import {
    Link
    } from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';

class Sports extends React.Component {

    render() {

        return (<div>
            <MyInfoNavbar title="活动信息" action=""/>
            <div className="content-wrap">
                暂无活动
            </div>
        </div>);
    }
}

export default Sports;