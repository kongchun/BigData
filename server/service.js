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
            convertSynonym: true, //转换同义词
            stripStopword: true //去除停止符
        });
        resolve(data);
        return;
    })
}