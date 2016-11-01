import React from 'react';
import {
	Link
} from 'react-router';
import ArticleList from './ArticleList';

class Home extends React.Component {
	render() {
		return (
			<ArticleList/>
		);
	}
}

export default Home;