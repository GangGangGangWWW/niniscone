var express = require('express');
var router = express.Router();
// 引入db
const {querySql} = require("../db/index2");
// const {Article} = require('../models')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const result = await querySql('SELECT * FROM user');
    console.table(result);
    res.status(200).json({
      code: 200,
      data: result
    });
} catch (error) {
  res.status(-1).json({
    code: -1,
    data: null
  });
    console.error(error);
}

});

module.exports = router;
