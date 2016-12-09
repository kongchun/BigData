var express = require('express');
var router = express.Router();
var swig = require('swig');
router.get('/', function(req, res) {
	var page ;
	var deviceAgent = req.headers['user-agent'].toLowerCase();
	if(/mobile/i.test(deviceAgent)){
		page = swig.renderFile('views/m_index.html', {
			html: ""
		});
	}else{
		page = swig.renderFile('views/index.html', {
			html: ""
		});
	}
	res.send(page);
});


module.exports = router;