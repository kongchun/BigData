import React from 'react';
import Header from './Header';
import Copyright from './Copyright';

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
	}
	render() {
		return (
			<div>
				<Header />
        		{this.props.children}
        		<Copyright />
        		<BackTop />
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