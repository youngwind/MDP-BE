var express = require('express');
var router = express.Router();


// 获取所有组件包
router.get('/all', function (req, res, next) {
    Component.findAll({
        order:'createdAt DESC'
    }).then(function (data) {
        res.send({
            code: 0,
            data: data
        })
    })

});

// 新增组件包
router.post('/add', function (req, res, next) {
    var name = req.body.name;

    if (!name) {
        throw new Error('组件包名字不能为空');
    }
    Component.create({
        name: name
    }).then(function (data) {
        res.send({
            code: 0,
            data: {
                id: data.dataValues.id
            }
        })
    });
});



module.exports = router;