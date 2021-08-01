var request =require('request');
var read = require('./read.js');
//var config = require('../config/config');
// var aotuConfig = config.wx_config.aotu;
let Segment = require ('segment').Segment;
var segment = new Segment();
segment.useDefault();
segment.loadSynonymDict('synonym.txt');
segment.loadStopwordDict('stopword.txt');
exports.getSegment = function(msg) {
    return new Promise((resolve, reject) => {
        var data = segment.doSegment(msg, {
            simple: true, //去除分词
            stripPunctuation: true, //去除标点符号
            convertSynonym: false, //转换同义词
            stripStopword: true //去除停止符
        });
        if(!!data && data.length>1){//no repeat
            var newData = [];
            var modal = {};
            for(var i=0;i<data.length;i++){
                if(modal[data[i]]!=1){
                    modal[data[i]] = 1;
                    newData.push(data[i]);
                }
            }
            resolve(newData);
        }else{
            resolve(data);
        }
        return;
    })
}

exports.getArticlesByWords = function(word,FromUserName,ToUserName,CreateTime,MsgType,res){
    if(sendMsgByCode(word,res,FromUserName,ToUserName,CreateTime,MsgType)){//指令操作
        return;
    }
    //关键字搜索
    var xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType>'+MsgType+'</MsgType><Content>您的消息我们已经收到</Content></xml>';
    if(word.indexOf('<![CDATA[')!=-1){
        word = word.replace('<![CDATA[','').replace(']]>','');
    }
    this.getSegment(word).then(function(data) {
        let dataWord = data;
        if(!!data && data.length>0){
            read.articlesByWords(data, 7).then(function(data) {
                if(!!data && !!data.data && data.data.length>0){
                    xml = '<xml>';
                    xml += '<ToUserName>'+FromUserName+'</ToUserName>';
                    xml += '<FromUserName>'+ToUserName+'</FromUserName>';
                    xml += '<CreateTime>'+CreateTime+'</CreateTime>';
                    xml += '<MsgType><![CDATA[news]]></MsgType>';
                    xml += '<ArticleCount>'+(++data.data.length)+'</ArticleCount>';
                    xml += '<Articles>';
                    var countStr = data.count;
                    if(data.count>20){
                        countStr = "20+";
                    }
                    xml += '<item>'
                        +'<Title><![CDATA[首席客服为你找到了'+countStr+'篇文章]]></Title> '
                        +'<PicUrl><![CDATA[https://www.limaodata.com/images/logo.jpg]]></PicUrl>'
                        +'<Url><![CDATA[https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx441605e8c97cf43e&redirect_uri=http%3a%2f%2fwww.limaodata.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect]]></Url> '
                        +'</item>,';
                    xml += data.data.map((article)=>(
                        '<item>'
                        +'<Title><![CDATA['+article.title+']]></Title> '
                        +'<PicUrl><![CDATA['+article.thumbnail+']]></PicUrl>'
                        +'<Url><![CDATA[https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx441605e8c97cf43e&redirect_uri='+encodeURIComponent('http://www.limaodata.com/#/article/'+article.id)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect]]></Url>'
                        +'</item>'
                    ));
                    xml += '</Articles></xml>';
                    read.recordLog({
                        "openid" : FromUserName.replace('<![CDATA[','').replace(']]>',''),
                        "unionid":'',
                        "search" : word,
                        "searchkey" : dataWord,
                        "action":5,
                        "time":new Date()
                    });
                    res.send(xml);
                }else{
                    read.articlesByPage(1,5).then(function(data) {
                        data = data.data;
                        if(!!data && data.length>0){
                            xml = '<xml>';
                            xml += '<ToUserName>'+FromUserName+'</ToUserName>';
                            xml += '<FromUserName>'+ToUserName+'</FromUserName>';
                            xml += '<CreateTime>'+CreateTime+'</CreateTime>';
                            xml += '<MsgType><![CDATA[news]]></MsgType>';
                            xml += '<ArticleCount>'+(++data.length)+'</ArticleCount>';
                            xml += '<Articles>';
                            xml += '<item>'
                                +'<Title><![CDATA[未找到预期的结果,请细化关键字]]></Title> '
                                +'<PicUrl><![CDATA[https://www.limaodata.com/images/logo.jpg]]></PicUrl>'
                                +'<Url><![CDATA[https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx441605e8c97cf43e&redirect_uri=http%3a%2f%2fwww.limaodata.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect]]></Url> '
                                +'</item>,';
                            xml += data.map((article)=>(
                                '<item>'
                                +'<Title><![CDATA['+article.title+']]></Title> '
                                +'<PicUrl><![CDATA['+article.thumbnail+']]></PicUrl>'
                                +'<Url><![CDATA[https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx441605e8c97cf43e&redirect_uri='+encodeURIComponent('http://www.limaodata.com/#/article/'+article.id)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect]]></Url>'
                                +'</item>'
                            ));
                            xml += '</Articles></xml>';
                        }
                        read.recordLog({
                            "openid" : FromUserName.replace('<![CDATA[','').replace(']]>',''),
                            "unionid":'',
                            "search" : word,
                            "searchkey" : dataWord,
                            "action":5,
                            "time":new Date()
                        });
                        res.send(xml);
                    }).catch(function(e) {
                        console.log('error:'+e);
                        res.send(xml);
                    })
                }

            }).catch(function(e) {
                console.log('error:'+e);
                res.send(xml);
            })
        }
    }).catch(function(e) {
        console.log('error:'+e);
        res.send(xml);
    })
}

function reviewMsg(word,res,FromUserName,ToUserName,CreateTime){
    var xml = '<xml>';
    xml += '<ToUserName>'+FromUserName+'</ToUserName>';
    xml += '<FromUserName>'+ToUserName+'</FromUserName>';
    xml += '<CreateTime>'+CreateTime+'</CreateTime>';
    xml += '<MsgType><![CDATA[text]]></MsgType>';
    xml += '<Content>'+word+'</Content></xml>';
    res.send(xml);
}

//指令操作
function sendMsgByCode(word,res,FromUserName,ToUserName,CreateTime,MsgType){
    if(word.indexOf('<![CDATA[')!=-1){
        word = word.replace('<![CDATA[','').replace(']]>','');
    }
    if(word.startsWith('@sendall')){//群发每周消息
        sendArticlesToALL(word,res,FromUserName,ToUserName,CreateTime,MsgType);
        return true;
    }else if(word.startsWith('@sendinfo')){//生成可群发消息模板
        sendArticlesInfo(word,res,FromUserName,ToUserName,CreateTime,MsgType);
        return true;
    }else if(word.startsWith('@code')){//管理员代码
        getAdminHelp(word,res,FromUserName,ToUserName,CreateTime,MsgType);
        return true;
    }else if(word=="客服" || word=="反馈" || word=="建议" || word=="七只狸猫" || word=="攻城狮" || word=="首席客服"){
        sendToKefu(word,res,FromUserName,ToUserName,CreateTime,MsgType);//接入客服平台
        return true;
    }else if(word=="学习资料"){
        var info = '';
        info += '资料链接：http://pan.baidu.com/s/1hsmoiMC';
        info += '\n领取密码：rw9a'
        reviewMsg(info,res,FromUserName,ToUserName,CreateTime,MsgType);//回复消息
        return true;
    }else if(word=="Python资料"){
        reviewMsg(info,res,FromUserName,ToUserName,CreateTime,MsgType);//回复消息
        var info = '';
        info += '资料链接：http://pan.baidu.com/s/1gfh7hIV';
        info += '\n领取密码：g613'
        return true;
    }else if(word=="大数据全部资料"){
        var info = '';
        info += '神经网络、深度学习：\nhttp://pan.baidu.com/s/1kVNwuhx 密码：94hp';
        info += '\n\n算法：\nhttp://pan.baidu.com/s/1c10ZJBq 密码：zxyb';
        info += '\n\n机器学习：\nhttp://pan.baidu.com/s/1qYUDKtA 密码：4mvg';
        info += '\n\n深度学习：\nhttp://pan.baidu.com/s/1i5uuojN 密码：kcxn';
        info += '\n\nCNCC演讲：\nhttp://pan.baidu.com/s/1c1PwslM 密码：4qb0';
        info += '\n\n编程教程：\nhttp://pan.baidu.com/s/1eSGfbCQ 密码：trzc';
        info += '\n\n计算机视觉：\nhttp://pan.baidu.com/s/1nuGq5tv 密码：vk2q';
        info += '\n\n论文合集：\nhttp://pan.baidu.com/s/1kVNwuiF 密码：kzdp';
        info += '\n\n模型：\nhttp://pan.baidu.com/s/1dF5XD2D 密码：sp5l';
        info += '\n\nTensorFlow教程：\nhttp://pan.baidu.com/s/1i5N06yD 密码：8xot';
        info += '\n\n数据集：\nhttp://pan.baidu.com/s/1eSrI4IQ 密码：rco4';
        info += '\n\n大规模名人人脸标注数据集CelebA：\nhttp://pan.baidu.com/s/1jIdxpRo 密码：13q0';
        info += '\n\n斯坦福NLP课程：\nhttp://pan.baidu.com/s/1sl8rdxF 密码：k21y';
        info += '\n\n推荐系统：\nhttp://pan.baidu.com/s/1nvog5uh 密码：pvgn';
        info += '\n\n自然语言处理：\nhttp://pan.baidu.com/s/1slTpOXf 密码：ooc0';
        info += '\n\n人工智能：\nhttp://pan.baidu.com/s/1pLAwX67 密码：cavg';
        info += '\n\npython：\nhttp://pan.baidu.com/s/1gfh7hIV 密码：g613';
        info += '\n\n请根据自身情况领取需要的部分';
        reviewMsg(info,res,FromUserName,ToUserName,CreateTime,MsgType);//回复消息
        return true;
    }
    return false;
}

function getKeyWordParams(word){
    var paramStr = word.split(' ');
    var params = [];
    var pIndex = 0;
    if(!!paramStr && paramStr.length>1){
        for(var i=1;i<paramStr.length;i++){
            if(!!paramStr[i] && !!(paramStr[i].trim())){
                params[pIndex++] = paramStr[i];
            }
        }
    }
    return params;
}

function sendToKefu(word,res,FromUserName,ToUserName,CreateTime,MsgType){
    var xml = '<xml>';
    xml += '<ToUserName>'+FromUserName+'</ToUserName>';
    xml += '<FromUserName>'+ToUserName+'</FromUserName>';
    xml += '<CreateTime>'+CreateTime+'</CreateTime>';
    xml += '<MsgType><![CDATA[transfer_customer_service]]></MsgType></xml>';
    res.send(xml);
}

function getAdminHelp(word,res,FromUserName,ToUserName,CreateTime,MsgType){
    var xml = '<xml>';
    xml += '<ToUserName>'+FromUserName+'</ToUserName>';
    xml += '<FromUserName>'+ToUserName+'</FromUserName>';
    xml += '<CreateTime>'+CreateTime+'</CreateTime>';
    xml += '<MsgType>'+MsgType+'</MsgType>';
    xml += '<Content><![CDATA[';
    xml += '七只狸猫快讯Admin命令清单：（命令属性用空格分隔）\n ';
    xml += '0、获取命令清单，输入：@code \n ';
    xml += '1、查询群发模板信息，输入：@sendinfo [天数（当前日前几天开始）] [查询记录数] [页码（默认1开始）] \n ';
    xml += '2、群发热门文章信息，输入：@sendall [天数（当前日前几天开始）] [查询记录数] [页码（默认1开始）] \n ';
    xml += ']]></Content></xml>';
    res.send(xml);
}

function sendArticlesInfo(word,res,FromUserName,ToUserName,CreateTime,MsgType){
    var params = getKeyWordParams(word);
    var page = 1;
    var limit = 7;
    var time = 7;
    var patrn = /^[0-9]*$/;
    if(params.length>0 && patrn.exec(params[0])!=null){
        time = parseInt(params[0]);
        if(time<=0) time = 1;
    }
    if(params.length>1 && patrn.exec(params[1])!=null){
        limit = parseInt(params[1]);
        if(limit<=0) limit = 0;
    }
    if(params.length>2 && patrn.exec(params[2])!=null){
        page = parseInt(params[2]);
        if(page<=0) page = 1;
    }
    time = getDaysBeforeDate(time);
    var xml = '<xml>';
    xml += '<ToUserName>'+FromUserName+'</ToUserName>';
    xml += '<FromUserName>'+ToUserName+'</FromUserName>';
    xml += '<CreateTime>'+CreateTime+'</CreateTime>';
    xml += '<MsgType>'+MsgType+'</MsgType>';
    xml += '<Content><![CDATA[';
    read.articlesByHits(page,limit,time).then(function(data) {
        data = data.data;
        var content ='第'+theWeek()+'周人工智能简报：\n\n ';
        if(!!data && data.length>0){
            var indexP = 0;
            content += data.map((article)=>(
                (++indexP)+'、'+ article.title+' \n '
            )).join('');
        }else{
            content += '未查询到热点快讯！ \n ';
        }
        content += ' \n\n 更多精彩点击<a href="http://www.limaodata.com">七只狸猫·快讯</a> ';///weekly?time='+time+'&week='+theWeek()+'
        xml += content;
        xml += ']]></Content></xml>';
        res.send(xml);
    }).catch(function(e) {
        xml += '未查询到热点快讯！ \n ';
        xml += ']]></Content></xml>';
        res.send(xml);
    })
}

function sendArticlesToALL(word,res,FromUserName,ToUserName,CreateTime,MsgType){
    var params = getKeyWordParams(word);
    var page = 1;
    var limit = 7;
    var time = 7;
    var patrn = /^[0-9]*$/;
    if(params.length>0 && patrn.exec(params[0])!=null){
        time = parseInt(params[0]);
    }
    if(params.length>1 && patrn.exec(params[1])!=null){
        limit = parseInt(params[1]);
    }
    if(params.length>2 && patrn.exec(params[2])!=null){
        page = parseInt(params[2]);
    }
    var time = getDaysBeforeDate(time);
    read.articlesByHits(page,limit,time).then(function(data) {
        data = data.data;
        var content ='第'+theWeek()+'周人工智能简报：\n\n ';
        if(!!data && data.length>0){
            var indexP = 0;
            content += data.map((article)=>(
                (++indexP)+'、'+ article.title+' \n '
            )).join('');
        }

        content += ' \n\n 更多精彩点击<a href="http://www.limaodata.com">七只狸猫·快讯</a> ';///weekly?time='+time+'&week='+theWeek()+'
        return content;
    }).then(function(content){
        weixinSendAll(content);
    }).catch(function(e) {
        console.info(e);
    })
    var actXML = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType>'+MsgType+'</MsgType><Content>您的指令已发送成功</Content></xml>';
    res.send(actXML);
}

//获取当前系统前N天的时间戳
function getDaysBeforeDate(n){
    var date =  new Date(), timestamp, newDate;
    timestamp = date.getTime();
    // 获取N天前的日期
    newDate = new Date(timestamp - n * 24 * 3600 * 1000);
    var year = newDate.getFullYear();
    // 月+1是因为js中月份是按0开始的
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();
    if (day < 10) { // 如果日小于10，前面拼接0
        day = '0' + day;
    }
    if (month < 10) { // 如果月小于10，前面拼接0
        month = '0' + month;
    }
    return new Date([year, month, day].join('-')).getTime();
}

/**
 * 判断年份是否为润年
 *
 * @param {Number} year
 */
function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
/**
 * 获取某一年份的某一月份的天数
 *
 * @param {Number} year
 * @param {Number} month
 */
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}
/**
 * 获取某年的某天是第几周
 * @param {Number} y
 * @param {Number} m
 * @param {Number} d
 * @returns {Number}
 */
function getWeekNumber(y, m, d) {
    var now = new Date(y, m - 1, d),
        year = now.getFullYear(),
        month = now.getMonth(),
        days = now.getDate();
    //那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }

    //那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / yearFirstDay);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }

    return week;
}

function theWeek(){
    var now = new Date();
    return getWeekNumber(now.getFullYear(), now.getMonth()+1, now.getDate());
}


//微信群发文本消息
function weixinSendAll(content){
    // var url = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=';
    // util.getToken(aotuConfig, function(result){
    //     if(result.err){
    //         console.info(result.msg);
    //         return;
    //     }
    //     var form= {
    //         "filter":{
    //             "is_to_all":true
    //         },
    //         "text":{
    //             "content":content
    //         },
    //         "msgtype":"text"
    //     };
    //     var access_token = result.data.access_token;
    //     request.post({
    //         url: url + access_token,
    //         form: JSON.stringify(form)
    //     },function(error,httpResponse,body){
    //         if(!error){
    //             console.info('群发消息成功,内容:['+JSON.stringify(body)+']');
    //             return;
    //         }
    //         console.info('群发消息失败,内容:['+content+']');
    //         return;
    //     });
    // });
}

exports.getArticlesByHits = function(page,limit,time) {
    if(!!time){

    }else{
        time = new Date().getTime();
    }
    if(limit<=0) limit = 0;
    if(page<=0) page = 1;
    return new Promise((resolve, reject) => {
        read.articlesByHits(page,limit,time).then(function(data) {
            resolve(data);
        }).catch(function(e) {
            console.log(e);
            reject([]);
        })
        return;
    })
}

exports.addVisitLog = function(url,req,res){
    if(url.indexOf("from=")==-1){
        return false;
    }
    var actLog = {
        'url' : url,
        'action' : 6,
        "time": new Date()
    };
    if(req.cookies["userinfo"] && req.cookies["userinfo"] != "") {
        actLog.openid = JSON.parse(req.cookies["userinfo"]).openid;
        actLog.unionid = JSON.parse(req.cookies["userinfo"]).unionid;
    }
    var urls = url.split("?");
    var fromValue = '';
    var sourceValue = '';
    if(!!urls && urls.length>1){
        var params = urls[1].split("&");
        if(!!params && params.length>0){
            for(var i=0;i<params.length;i++){
                var param = params[i].split("=");
                if("from"==param[0] && param.length>1){
                    fromValue = param[1];
                    if(!!fromValue){
                        actLog.from = fromValue;
                    }
                }
                if("source"==param[0] && param.length>1){
                    sourceValue = param[1];
                    if(!!sourceValue){
                        actLog.source = sourceValue;
                    }
                }
            }
        }
        read.recordLog(actLog);
    }
    var newUrl = url.replace('&from='+fromValue,'').replace('from='+fromValue,'')
        .replace('&source='+sourceValue,'').replace('source='+sourceValue,'');
    res.redirect(newUrl);
    return true;
}

function sendTextByopenId(openId, text){
    // if(!!!openId){
    //     openId = ['o9mrKv-IJQQEKejmhOPrEiqcDUwA','o9mrKv7eCr4FKv4kMIT7JMh72x1A'];
    // }else{
    //     openId = ['o9mrKv-IJQQEKejmhOPrEiqcDUwA','o9mrKv7eCr4FKv4kMIT7JMh72x1A',openId];
    // }
    // var url = 'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=';
    // util.getToken(aotuConfig, function(result){
    //     if(result.err){
    //         console.info(result.msg);
    //         return;
    //     }
    //     var form= {
    //             "touser":openId,
    //             "msgtype": "text",
    //             "text": { "content": text},
    //             "send_ignore_reprint":0
    //     };
    //     var access_token = result.data.access_token;
    //     request.post({
    //         url: url + access_token,
    //         form: JSON.stringify(form)
    //     },function(error,httpResponse,body){
    //         if(!error){
    //             console.info('openId:'+openId);
    //             console.info('发送消息成功,内容:['+JSON.stringify(body)+']');
    //             return;
    //         }
    //         console.info('发送消息失败,内容:['+content+']');
    //         return;
    //     });
    // });
}