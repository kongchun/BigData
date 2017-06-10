import React from 'react';
class BackLastPage extends React.Component {

    componentDidMount() {
        $("#back-to-lastpage").headroom({
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
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            return null;
        }
        return (<div id="lastPageButton" style={{display:'none'}}><a href="javascript:history.back(-1);" id="back-to-lastpage" style=
            {{display: "inline"}}><i className="miconfont micon-back"></i></a></div>)
    }
}
export default BackLastPage;