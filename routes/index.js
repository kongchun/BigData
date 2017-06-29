var express = require('express');
var router = express.Router();
var swig = require('swig');
var request =require('request');
var read = require('../server/read.js');
var signature = require('../sign/signature');
var config = require('../config/config');
var service = require('../server/service.js');

var http = require('http');
var cache = require('memory-cache');
var sha1 = require('sha1'); //签名算法


router.get('/', function(req, res) {
	var code = req.query.code;
	var state = req.query.state;
	var isWinXinLogin = false;
	if(req.url.indexOf('/?react=')!=-1){
		isWinXinLogin = true;
	}
	var appid = config.wx_config.aotu.appid;
	var secret = config.wx_config.aotu.secret;
    if(service.addVisitLog(req.url, req, res)){
        return;
    }
	if(isWinXinLogin){
		var reactParam = req.url.replace('/?react=','').replace('*','/').split('&code=')[0];
		req.url = '/#/'+reactParam;
	}
	console.log('req.url:'+req.url);
	console.log('req.cookie:'+req.cookie);
	console.log('code:'+code);
	console.log('state:'+state);
	console.log('res:'+res.url);
	var deviceAgent = req.headers['user-agent'].toLowerCase();
	if(/mobile/i.test(deviceAgent)){
	}else{
		appid = config.wx_config.openOAuth.appid;
		secret = config.wx_config.openOAuth.secret;
	}
	console.log('appid:'+appid);
	if(!!code){
		request.get({
				url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+secret+'&code='+code+'&grant_type=authorization_code',},
			function(error, response, body){
				if(response.statusCode == 200){
					//console.log(JSON.parse(body));
					var data = JSON.parse(body);
					var access_token = data.access_token;
					var openid = data.openid;
					console.log(data);
					console.log(access_token);
					console.log(openid);

					request.get(
						{
							url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
						},
						function(error, response, body){
							if(response.statusCode == 200){

								var userinfo = JSON.parse(body);
								console.log(userinfo);
								console.log("微信登入成功");
								if(!!userinfo && !!!userinfo.errcode){
									res.cookie("userinfo", JSON.stringify(userinfo))
								}
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
								if(userinfo.unionid && userinfo.unionid != ""){
									read.userData(userinfo).then(function(){
										if(userinfo && userinfo != ""){
											read.recordLog({
												"unionid":userinfo.unionid,
												"action":0,
												'time':new Date()
											})
										}
										if(isWinXinLogin){
											read.recordLog({
												"unionid":userinfo.unionid,
												"openid":userinfo.openid,
												"action":7,
												'time': new Date(),
												"url": req.url
											})
										}
									})
								}
								if(isWinXinLogin){
									res.redirect(req.url);
								}else{
									res.send(page);
								}

							}else{
								console.log(response.statusCode);
							}
						}
					);
				}else{
					console.log(response.statusCode);
				}
			}
		);
	}else{
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
	}
});

router.get('/getSignature',function(req,res,next){
	var url = req.param("url");
	signature.sign(url,function(signatureMap){
		signatureMap.appId = config.wx_config.aotu.appid;
		console.log(signatureMap);
		res.send(signatureMap);
	});
});

var crypto = require('crypto');


var aotuConfig = config.wx_config.aotu;
var util = require('../util/util');
var token = "limaodatabigdate";
/* GET home page. */
router.get('/weixin', function(req, res, next) {
	// console.log(5);
	// var code = req.query.code;
	// console.log(code);
	var signature = req.query.signature;
	var timestamp = req.query.timestamp;
	var nonce = req.query.nonce;
	var echostr = req.query.echostr;
	var array = new Array(token,timestamp,nonce);
	array.sort();
	var str = array.toString().replace(/,/g,"");
	var sha1Code = crypto.createHash("sha1");
	var code = sha1Code.update(str,'utf-8').digest("hex");
	if(code===signature){
		res.send(echostr)
	}else{
		res.send("error");
	}
});

router.post('/weixin', function(req, res, next) {
	//var _da;
	req.on("data",function(data){
		_da = data.toString("utf-8");
		console.log(_da);
	});
	req.on("end",function(){
		//console.log("end");
		var xml='';
		var ToUserName = getXMLNodeValue('ToUserName',_da);
		var FromUserName = getXMLNodeValue('FromUserName',_da);
		var CreateTime = getXMLNodeValue('CreateTime',_da);
		var MsgType = getXMLNodeValue('MsgType',_da);
		if(MsgType.indexOf('text') != '-1'){
			var Content = getXMLNodeValue('Content',_da);
			var MsgId = getXMLNodeValue('MsgId',_da);
			xml = service.getArticlesByWords(Content,FromUserName,ToUserName,CreateTime,MsgType,res);
		}else if(MsgType.indexOf('event') != '-1'){
			var Event =getXMLNodeValue('Event',_da);
			if(Event.indexOf('subscribe') != '-1'){
				xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType><![CDATA[text]]></MsgType><Content>每天十分钟阅读人工智能科技资讯—用科技视角看世界</Content></xml>';
			}else if(Event.indexOf('VIEW') != '-1'){
				console.log(3);
				console.log(FromUserName);
			}else{
				xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType><![CDATA[text]]></MsgType><Content>你好</Content></xml>';
			}
		}else{
			xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType><![CDATA[text]]></MsgType><Content>暂未提供此种类型的服务</Content></xml>';
		}
		if(!!xml){
			res.send(xml);
		}
	});
});

function getXMLNodeValue(node_name,xml){
	var tmp = xml.split("<"+node_name+">");
	//console.log(tmp[1]);
	var _tmp = tmp[1].split("</"+node_name+">");
	//console.log(_tmp[0]);
	return _tmp[0];
}

router.get('/weixin/sendallText',function(req,res,next){
	console.log("1");
	var content = req.body.msgContent;
	var url = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=';
	util.getToken(aotuConfig, function(result){
		if(result.err){
			console.log("2");
			return res.status(500).send(result.msg);
		}
		console.log("3");
		var content ='第10周人工智能简报：\n\n 1、天云大数据雷涛：企业要加快将AI技术应用在金融科技这片蓝海！\n 2、抢先看！2017年中国大数据发展报告（PPT） \n 3、数造未来 —2017永洪科技大数据分析沙龙•北京站 \n 4、图灵测试寿终正寝，我们该如何评测人工智能？ \n 5、Facebook 这次有人情味！要用 AI 找出那些有自杀倾向的用户 \n 6、算话征信CEO蒋庆军：只有真正“说话算数”的征信机构才能建立 \n 7、传十四年元老“七公”任职阿里B2B总经理 要发力云计算和大数据? \n\n 更多精彩点击<a href="http://www.limaodata.com">七只狸猫</a> '
		var form=   {
			"filter":{
				"is_to_all":true
			},
			"text":{
				"content":content
			},
			"msgtype":"text"
		};
		var access_token = result.data.access_token;
		console.log(access_token);
		console.log("4");
		request.post({
			url: url + access_token,
			form: JSON.stringify(form)
		},function(error,httpResponse,body){
			console.log("6");
			if(!error){
				console.log("5");
				return res.status(200).send(JSON.parse(body));
			}
			return res.status(500).send('群发消息失败');
		});
	});
});


//����Ⱥ��ͼ����Ϣ
router.get('/weixin/sendallMaterial',function(req,res,next){
	console.log("1");
	var content = req.body.msgContent;
	var url = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=';

	util.getToken(aotuConfig, function(result){
		if(result.err){
			console.log("2");
			return res.status(500).send(result.msg);
		}
		console.log("3");
		var form=   {
			"filter":{
				"is_to_all":true
			},
			"mpnews":{
				"media_id":"kh76zhakFgrGh_KIU0SWSg66yek5JM_A-xKsitMb8Wk"
			},
			"msgtype":"mpnews",
			"send_ignore_reprint":0
		};
		var access_token = result.data.access_token;
		console.log(access_token);
		console.log("4");
		request.post({
			url: url + access_token,
			form: JSON.stringify(form)
		},function(error,httpResponse,body){
			console.log("6");
			if(!error){
				console.log("5");
				return res.status(200).send(JSON.parse(body));
			}
			return res.status(500).send('群发消息失败');
		});
	});
});

router.get('/weixin/mediaid',function(req,res,next){
	console.log("1");
	var content = req.body.msgContent;
	var url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=';

	util.getToken(aotuConfig, function(result){
		if(result.err){
			console.log("2");
			return res.status(500).send(result.msg);
		}
		console.log("3");
		var form=   {
			"type":"image",
			"offset":0,
			"count":10
		};
		var access_token = result.data.access_token;
		console.log(access_token);
		console.log("4");
		request.post({
			url: url + access_token,
			form: JSON.stringify(form)
		},function(error,httpResponse,body){
			console.log("6");
			if(!error){
				console.log("5");
				return res.status(200).send(JSON.parse(body));
			}
			return res.status(500).send('群发消息失败');
		});
	});
});

//�����˵�creatMenu
router.get('/weixin/creatMenu',function(req,res,next){
	console.log("1");
	var content = req.body.msgContent;
	var url = ' https://api.weixin.qq.com/cgi-bin/menu/create?access_token=';

	util.getToken(aotuConfig, function(result){
		if(result.err){
			console.log("2");
			return res.status(500).send(result.msg);
		}
		console.log("3");
		var form= {
			"button": [
				{
					"type": "view",
					"name": "快阅",
					"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx441605e8c97cf43e&redirect_uri=http%3a%2f%2fwww.limaodata.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
				},
				{
					"type": "view",
					"name": "资讯",
					"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx441605e8c97cf43e&redirect_uri=http%3A%2F%2Fwww.limaodata.com%2F%23%2Fpage%2F1&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
					//"url": "http://www.limaodata.com/#/hotdot"
				},
				{
					"type": "view",
					"name": "我的",
					"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx441605e8c97cf43e&redirect_uri=http%3a%2f%2fwww.limaodata.com%2f%23%2fmyInfo&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
					//"url": "http://www.limaodata.com/#/myInfo"
				}
			]
		};
		var access_token = result.data.access_token;
		console.log(access_token);
		console.log("4");
		request.post({
			url: url + access_token,
			form: JSON.stringify(form)
		},function(error,httpResponse,body){
			console.log("6");
			if(!error){
				console.log("5");
				return res.status(200).send(JSON.parse(body));
			}
			return res.status(500).send('群发消息失败');
		});
	});
});


//�ϴ�ͼ����Ϣ
router.get('/weixin/material',function(req,res,next){
	console.log("1");
	var content = req.body.msgContent;
	var url = 'https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=';

	util.getToken(aotuConfig, function(result){
		if(result.err){
			console.log("2");
			return res.status(500).send(result.msg);
		}
		console.log("3");
		var form=   {
			"articles": [{
				"title": "����",
				"thumb_media_id": "kh76zhakFgrGh_KIU0SWSgG1GRHX5hO8BSEPQCoyokk",
				"author": "����",
				"digest": "",
				"show_cover_pic": "1",
				"content": "6666666",
				"content_source_url": "http://www.limaodata.com"
			},
				{
					"title": "����1",
					"thumb_media_id": "kh76zhakFgrGh_KIU0SWShP7LTTcaCxnj3XHaUAh3Bg",
					"author": "����1",
					"digest": "",
					"show_cover_pic": "1",
					"content": "webTeam��",
					"content_source_url": "http://www.baidu.com"
				},
				{
					"title": "����2",
					"thumb_media_id": "kh76zhakFgrGh_KIU0SWSgG1GRHX5hO8BSEPQCoyokk",
					"author": "����2",
					"digest": "",
					"show_cover_pic": "0",
					"content": "����������",
					"content_source_url": "http://map.baidu.com/"
				}
			]
		};
		var access_token = result.data.access_token;
		console.log(access_token);
		console.log("4");
		request.post({
			url: url + access_token,
			form: JSON.stringify(form)
		},function(error,httpResponse,body){
			console.log("6");
			if(!error){
				console.log("5");
				return res.status(200).send(JSON.parse(body));
			}
			return res.status(500).send('群发消息失败');
		});
	});
});

router.get('/weekly', function(req, res) {
	var page ;
	page = swig.renderFile('views/weeklies.html', {
		html: ""
	});
	res.send(page);
});

module.exports = router;