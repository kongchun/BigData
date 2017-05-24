import React from 'react';
import {
	Link
} from 'react-router';
import ArticleList from './ArticleList';
import QuickRead from './QuickRead';
import Header from './Header'
class Home extends React.Component {
	render() {
		return (<div>
				<QuickRead/>
			</div>

		);
	}
}

export default Home;