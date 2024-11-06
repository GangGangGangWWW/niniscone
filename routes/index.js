var express = require('express');
var router = express.Router();
// 引入db
const Conneciton = require("../db/index2");
/* GET home page. */
router.get('/', async function (req, res, next) {
  const [rows, fields] = await Conneciton.query("SELECT * FROM user")
  console.log(rows,'ssss');
  
  res.status(200).json({
    code:200,
    data:rows
  })
  // db.query(sql, async function (err, result) {
  //   if (err) {
  //     return res.send({ state: 1, message: err })
  //   }
  //   const [rows, fields] = await Conneciton.query("SELECT * FROM user");
  //   return res.send({ state: 0, message: '查询成功', data: rows })
  // })
  // res.render('index', { title: 'Express' });
});

module.exports = router;
// let users =[{id:'1',name:'展示'},{id:'2',name:'晚上'},{id:'3',name:'小刘'}]

// let order = [{id:1,list:[{num:1,preice:'150'},{num:2,preice:'180'}]},
//              {id:2,list:[{num:1,preice:'16'},{num:2,preice:'170'}]}
//             ]