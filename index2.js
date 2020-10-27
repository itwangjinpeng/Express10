const express = require('express')
var bodyParser = require('body-parser')
var fs = require("fs");
let stu = require('./controller/stuController')


const app = express()
const port = 4000

app.get('/', (req, res) => {
    var content = JSON.stringify(req.query, null, 2);
    var name = req.query.name;
    var age = req.query.age
    let result = stu.add(req.query)
    console.log('结果   ' + result);
    fs.writeFile('input.txt', `姓名是${name},年龄是${age}\n\n`, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------")
        console.log("读取写入的数据！");
        fs.readFile('input.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + data.toString());
        });
    });

    res.send(`姓名是${name},年龄是${age}\n\n` + '<h1>Hello World!</h1><br><br><div style="background-color:red;width:400px;height:400px;">江西软件职业技术大学</div>')
})



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))


// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
    console.log(JSON.stringify(req.body, null, 2));
})
app.listen(port, () => console.log(`服务器已经启动了，端口号是： ${port}!`))