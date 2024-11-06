const express = require('express');
const router = express.Router();
const { querySql } = require("../db/index2");

// 获取所有店铺列表
router.get('/', async function (req, res, next) {
  try {
    const result = await querySql('SELECT * FROM shopList');
    console.table(result);
    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: '获取数据失败了'
    });
    console.error(error);
  }
});



// 获取数据
// router.get()
// 保存数据
// router.post()
// 更新数据
// router.put()
// 删除数据
// router.delete()


// 添加购物车
router.post('/addCart', async function (req, res, next) {
  try {
    // 假设前端发送过来的是一个包含多个项目的数组
    const cartItems = req.body;
    // 构建SQL语句
    const placeholders = cartItems.map(() => '(?,?,?,?,?,?,?,?,?)').join(',');
    const sql = `INSERT INTO cartlist (title, price, shopid, sum, postage, value, role,huhao,shopimg) VALUES ${placeholders}`;

    // 获取所有值并将它们扁平化
    const values = cartItems.reduce((acc, item) => {
      acc.push(item.title, item.price, item.shopid, item.postage, item.sum, item.value, item.role,item.huhao,item.shopimg);
      return acc;
    }, []);

    // 执行SQL语句
    const result = await querySql(sql, values);

    // 返回新插入的数据行的ID列表
    // 假设 insertId 表示第一个插入记录的ID
    const insertedIds = Array.from({ length: cartItems.length }, (_, i) => result.insertId + i);

    res.status(200).json({
      code: 200,
      msg: '数据保存成功',
      data: { ids: insertedIds }
    });

  } catch (error) {
    console.error("Error executing SQL:", error);
    res.status(500).json({
      code: -1,
      msg: '保存数据失败'
    });
  }
});

// 获取购物车数据
router.get('/getCartList/:huhao', async function (req, res, next) {
  try {
    const result = await querySql('SELECT * FROM cartlist');
    console.table(result);
    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: '获取数据失败了'
    });
    console.error(error);
  }
});

// 删除一条商品
router.delete('/deleteCartItem/:id', async function (req, res, next) {
  const itemId = req.params.id;
  try {
    // 执行SQL语句来删除指定ID的记录
    const result = await querySql('DELETE FROM cartlist WHERE id = ?', [itemId]);

    // 如果没有删除任何行，则说明没有找到对应的记录
    if (result.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        msg: '未找到指定的购物车记录'
      });
    }

    // 删除成功
    res.status(200).json({
      code: 200,
      msg: '删除成功'
    });
  } catch (error) {
    // 捕获异常，并返回错误信息
    res.status(500).json({
      code: -1,
      msg: '删除数据失败了'
    });
    console.error(error);
  }
});

// 修改商品数量
router.post('/updateCart', async function (req, res, next) {
  try {
    // 获取前端发送的批量更新数据
    const updates = req.body;

    // 遍历每一个需要更新的记录
    for (const update of updates) {
      const { id, title, price, shopid, postage, sum, role, value } = update;
      // 构建SQL更新语句
      const sql = 'UPDATE cartlist SET title=?, price=?, shopid=?, postage=?, sum=?, role=?, value=? WHERE id=?';
      // 准备更新的值
      const values = [title, price, shopid, postage, sum, role, value, id];
      // 执行更新操作
      const result = await querySql(sql, values);
      // 检查是否更新了任何行
      if (result.affectedRows === 0) {
        throw new Error(`No rows affected for ID: ${id}`);
      }
    }

    res.status(200).json({
      code: 200,
      msg: '数据更新成功',
      data: { updatedCount: updates.length }
    });

  } catch (error) {
    console.error("Error executing SQL:", error);
    res.status(500).json({
      code: -1,
      msg: '更新数据失败',
      error: error.message
    });
  }
});

// 获轮播数据
router.get('/getSwper', async function (req, res, next) {
  try {
    const result = await querySql('SELECT * FROM swper');
    console.table(result);
    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: '获取数据失败了'
    });
    console.error(error);
  }
});

// 获轮商品展示图
router.get('/getShowImg', async function (req, res, next) {
  try {
    const result = await querySql('SELECT * FROM showimg');
    console.table(result);
    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: '获取数据失败了'
    });
    console.error(error);
  }
});

// 根据ID查询店铺
router.get('/shops/:id', async function (req, res, next) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ code: -1, msg: '缺少必要的字段' });
    }

    const sql = 'SELECT * FROM car WHERE id = ?';
    const value = [id];

    const result = await querySql(sql, value);

    if (result.length === 0) {
      return res.status(404).json({ code: -1, msg: '未找到数据' });
    }

    res.status(200).json({
      code: 200,
      data: result[0]
    });

  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: '查询数据失败'
    });
    console.error(error);
  }
});

// 保存用户信息
router.post('/addUserInfo', async function (req, res, next) {
  try {
    const { username, mobile,address, remark,youFei,orderinfo,zongE,selfPickup,huhao } = req.body;
    const sql = 'INSERT INTO user (username, mobile,address, remark,youFei,orderinfo,zongE,selfPickup,huhao) VALUES (?, ?, ?,?, ?, ? ,?,?,?)';
    const values = [username, mobile,address, remark,youFei,orderinfo,zongE,selfPickup,huhao];

    const result = await querySql(sql, values);

    // 返回新插入的数据行的ID
    res.status(200).json({
      code: 200,
      msg: '数据保存成功',
      data: { id: result.insertId }
    });

  } catch (error) {
    // console.error("Error executing SQL:", error);
    res.status(500).json({
      code: -1,
      msg: '保存数据失败',
      info:function() {
        return error
      }
    });
  }
});
module.exports = router;