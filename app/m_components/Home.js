import React from 'react';
import {
	Link
} from 'react-router';
import ArticleList from './ArticleList';
import Header from './Header'
class Home extends React.Component {
	render() {
		return (<div>
				<ArticleList/>
			</div>

		);
	}
}

export default Home;