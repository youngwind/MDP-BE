var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var path = require('path');
var fs = require('fs');
var config = require('../common/config');
var qiniu = require("qiniu");
var recordRelease = require('../middleware/record_release');

router.use('/upload', recordRelease());

router.post('/upload', multipart(), function (req, res) {
    //get filename
    var filename = req.files.files.originalFilename || path.basename(req.files.files.path);
    //copy file to a public directory
    var targetPath = path.dirname(__filename) + '/../public/' + filename;
    //copy file
    var stream = fs.createReadStream(req.files.files.path);
    stream.pipe(fs.createWriteStream(targetPath));

    var had_error = false;
    stream.on('error', function (err) {
        had_error = true;
    });
    stream.on('close', function () {
        uploadFileToCDN();
    });

    function uploadFileToCDN() {
        //需要填写你的 Access Key 和 Secret Key
        qiniu.conf.ACCESS_KEY = config.qiniu.Access_Key;
        qiniu.conf.SECRET_KEY = config.qiniu.Secret_Key;

        //要上传的空间
        var bucket = config.qiniu.bucket;

        //上传到七牛后保存的文件名
        var key = filename.split('.')[0] + '-' + req.query.nextVersion + '.' + filename.split('.')[1];

        // 生成上传token
        var token = new qiniu.rs.PutPolicy(bucket + ":" + key).token();


        //要上传文件的本地路径
        var filePath = targetPath;

        //上传
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(token, key, filePath, extra, function (err, ret) {
            if (!err) {
                // 上传成功， 处理返回值
                //return file url
                res.send({code: 200, msg: {url: config.qiniu.cdnUrl + filename}});
            } else {
                // 上传失败， 处理返回代码
                res.send({code: 500, msg: "上传失败"});
            }
        });
    }


});

router.get('/all', function (req, res) {
    var componentId = req.query.componentId;
    Release.findAll({
        where: {
            componentId: componentId
        },
        order: 'createdAt DESC'

    }).then(function (data) {
        res.send({
            code: 0,
            data: data
        })
    })
});


module.exports = router;
