import React from 'react';
import {
	Link
} from 'react-router';

import Home from './Home';

class Header extends React.Component {
	render() {
		return (

			<div className="navbar navbar-inverse navbar-static-top">
				<div className="container">
	       			<div className="navbar-header">
						<a href="/#/home" className="navbar-brand hidden-sm">大数据头条</a>
	        		</div>
      			</div>
    		</div>
		);
	}
}


export default Header;