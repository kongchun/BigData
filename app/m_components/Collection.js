import React from 'react';
import {
	Link
} from 'react-router';
import MyInfoNavbar from './MyInfoNavbar';
class Collection extends React.Component {
	render() {
		return (<div>
			<MyInfoNavbar title="收藏" action="编辑"/>
		    <CollectList />
		</div>)
	}
}


export default Collection;

//收藏列表
var CollectList = React.createClass({
	render:function(){
		return ( <div className="collect-list">
			<ul>
				<li>
					<CollectItem title="人工智能时代有哪些投资机会？" time="2017年1月6日 10:21"/>
				</li>
				<li>
					<CollectItem title="AI 实验室成立一周年，Facebook许了什么愿望？" time="2017年1月6日 10:21"/>
				</li>
				<li>
					<CollectItem title="空间数据挖掘常用方法" time="2016年11月6日 10:21"/>
				</li>
				<li>
					<CollectItem title="思科为大数据安全分析开源 OpenSOC" time="2016年6月6日 10:21"/>
				</li>
			</ul>
	  </div> )
	}
});
//收藏的文章项
var CollectItem = React.createClass({
	render:function(){
		return ( <div className="collect-list-item">
			<div className="collect-title">{this.props.title}</div>
			<div className="collect-time">{this.props.time}</div>
		</div>);
	}
})