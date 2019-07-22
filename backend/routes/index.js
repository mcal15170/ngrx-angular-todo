var express = require('express');
var router = express.Router();
var apis = require('./../apis/jsondata')

/* GET home page. */
router.get('/', function(req, res, next) {
    var selectList = [{
            id: 'low',
            lable: 'low'
        },
        {
            id: 'medium',
            lable: 'medium'
        },
        {
            id: 'high',
            lable: 'high'
        }

    ]
    res.send(selectList)
});

module.exports = router;