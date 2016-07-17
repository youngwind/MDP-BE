var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/component/list', function (req, res, next) {
    res.send({
        code: 0,
        data: [
            {
                id: 1,
                name: "user_center"
            },
            {
                id: 2,
                name: "shop_list"
            }
        ]
    });
});

module.exports = router;
