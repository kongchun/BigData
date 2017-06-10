import React from 'react';
import Header from './Header';
import Copyright from './Copyright';
import PCHeader from './PCHeader';

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
			<div className="pc-container">
				<PCHeader />
        		{this.props.children}
        		<Copyright />
        		<ToolBar />
     		</div>
		);
	}
}
class ToolBar extends React.Component {
	/**
	 <a href="javascript:;" className="toolbar-item toolbar-item-feedback"></a>
	 <a href="javascript:;" className="toolbar-item toolbar-item-app">
	 <span className="toolbar-code-layer">
	 <div id="urlcode"></div>
	 </span>
	 </a>
	 */
    render() {
        return (<div className="toolbar">
            <a href="javascript:;" className="toolbar-item toolbar-item-weixin">
                    <span className="toolbar-layer2">
                        <img src="images/limao.jpg" width="130" height="130"/>
                    </span>
            </a>


            <a href="javascript:scroll(0,0)" id="top" className="toolbar-item toolbar-item-top"></a>
        </div>)
    }
}
class BackTop extends React.Component {
	render() {
		return (<a href="javascript:scroll(0,0)" id="back-to-top" style=
			{{display: "inline"}}><i className="glyphicon glyphicon-chevron-up"></i></a>)
	}
}
export default App;