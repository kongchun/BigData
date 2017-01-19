import React from 'react';
import {
    Link
    } from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';

class Sports extends React.Component {

    render() {

        return (<div>
            <div className="sports-content-wrap">
                <div className="sports-content-top">
                    <img src="../images/555.png" alt="七只狸猫" width="100" height="118"/>
                </div>
                <div className="sports-content-bottom">
                    <h4 >攻城狮回家过年了...</h4>
                    <h5 className="happyNewYear">狸猫预祝大家新春愉快！鸡年吉祥！</h5>
                </div>
            </div>
        </div>);
    }
}

export default Sports;