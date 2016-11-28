import React from 'react';
import {
	Link
} from 'react-router';

import Home from './Home';

class Header extends React.Component {

	componentDidMount() {
		$(".navbar").headroom({
			tolerance: 2,
			offset: 50,
			classes: {
				initial: "animated",
				pinned: "slideInDown",
				unpinned: "slideOutUp"
			}
		});
	}
	render() {
		return (

			<div className="navbar navbar-inverse navbar-fixed-top">
				<div className="container">
	       			<div className="navbar-header">
						<a href="/#/home" className="navbar-brand hidden-sm">七只狸猫</a>
	        		</div>
      			</div>
    		</div>

		);
	}
}


export default Header;