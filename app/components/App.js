import React from 'react';
import Header from './Header';


class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
        		{this.props.children}
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