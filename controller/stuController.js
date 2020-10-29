const exec = require('../db/mysql')

//添加学生数据
const add = (stu) => {
    const sql = 'insert into stu(name,age) values(?,?)'
    const params = [stu.name, stu.age]
    return exec(sql, params).then(insertStu => {
        return {
            id: insertStu.insertId
        }
    })
}

//查询学生
const query = () => {
    const sql = "select * from stu"
    return exec(sql).then(data => {
        return data
    })
}

//修改学生
const update = (stu) => {
    const sql = "update stu set stuname=?,age=?,sex=? where sid=?"
    const params = [stu.name, stu.age, stu.sex, stu.id]
    return exec(sql, params).then(data => {
        return {
            row: data.affectedRows
        }
    })
}

//删除学生
const del = (id) => {
    const sql = "delete from stu where sid=?"
    const params = [id]
    return exec(sql, params).then(data => {
        return {
            row: data.affectedRows
        }
    })
}

module.exports = {
    add,
    query,
    update,
    del
}