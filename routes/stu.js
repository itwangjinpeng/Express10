let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let stu = require('../controller/stuController')


// 解析提交的form表单参数
let urlencodedParser = bodyParser.urlencoded({
    extended: true
})

//添加学生
router.post('/add', urlencodedParser, (req, res, next) => {
    let result = stu.add(req.body)
    result.then(data => {
        if (data.id > 1) {
            res.json({
                code: 200,
                msg: "添加成功",
                data
            })
        } else {
            res.json({
                code: 500,
                msg: "添加失败",
                data
            })
        }
    })

})

//查询学生
router.get('/query', (req, res, next) => {
    let result = stu.query();
    result.then(data => {
        res.json({
            data
        })
    })
})

//修改学生
router.post('/update', urlencodedParser, (req, res, next) => {
    let result = stu.update(req.body)
    result.then(row => {
        res.json({
            row
        })
    })
})

//删除学生
router.get("/del", (req, res, next) => {
    let result = stu.del(req.query.id)
    result.then(row => {
        res.json({
            row
        })
    })
})

module.exports = router