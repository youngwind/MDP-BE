var express = require('express');
var router = express.Router();
var is = require("is_js");


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

// 删除todo
router.post('/delete', function (req, res, next) {
    var todoId = req.body.todoId;
    if (is.empty(todoId)) {
        throw  new Error('todoId 不能为空');
    }
    Todos.destroy({
        where: {
            id: todoId
        }
    }).then(function (data) {
        if (data == 0) {
            next(new Error('删除出错'));
        } else {
            res.send({
                code: 0,
                data: {
                    id: todoId
                }
            })
        }

    });

});

// 完成某个todo
router.post('/complete', function (req, res, next) {
    var todoId = req.body.todoId;
    if (is.empty(todoId)) {
        throw new Error('todoId 不能为空');
    }
    Todos.update({
        status: 1
    }, {
        where: {
            id: todoId
        }
    }).then(function (data) {
        res.send({
            code: 0,
            data: {
                id: todoId
            }
        })
    });
});

// 取消完成某个todo
router.post('/uncomplete', function (req, res, next) {
    var todoId = req.body.todoId;
    if (is.empty(todoId)) {
        throw new Error('todoId 不能为空');
    }
    Todos.update({
        status: 0
    }, {
        where: {
            id: todoId
        }
    }).then(function (data) {
        res.send({
            code: 0,
            data: {
                id: todoId
            }
        })
    });
});


module.exports = router;