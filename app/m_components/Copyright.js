import React from 'react';
import {
	Link
} from 'react-router';

class Copyright extends React.Component {
	render() {
		return (
			<div className="copyright">
	        <div className="container">
	            <div className="row">
	                <div className="col-sm-12">
	                    <span>Copyright © <a href="http://www.limaodata.com/">苏州猫耳网络科技有限公司</a></span> |
	                    <span><a href="http://www.miibeian.gov.cn/" target="_blank">苏ICP备14030752号</a></span> 
	                </div>
	            </div>
	        </div>
	    </div>
		);
	}
}

export default Copyright;