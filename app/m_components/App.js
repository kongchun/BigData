import React from 'react';
import Header from './Header';
import Copyright from './Copyright';
import Footer from './Footer'
import BackLastPage from './BackLastPage';

class App extends React.Component {

	componentDidMount() {
		$("#back-to-top").headroom({
			tolerance: 2,
			offset: 50,
			classes: {
				initial: "animated",
				pinned: "fadeIn",
				unpinned: "fadeOut"
			}
		});
		if(isWeiXin()){
			$(".header-nav").hide();
			$(".content-wrap,.content-container").css("marginTop",0);
		}
		function isWeiXin(){
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				return true;
			}else{
				return false;
			}
		}
	}
	render() {

		return (
			<div>
        		{this.props.children}
        		<BackTop />
        		<BackLastPage />
				<Footer />
     		</div>
		);
	}
}

class BackTop extends React.Component {
	render() {
		return (<a href="javascript:scroll(0,0)" id="back-to-top" style=
			{{display: "inline"}}><i className="glyphicon glyphicon-chevron-up"></i></a>)
	}
}
export default App;