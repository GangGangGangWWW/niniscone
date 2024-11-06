const mysql = require("mysql2/promise");

// 连接mysql
async function connect() {
    return await mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "123456",
        database: "test",
        charset: 'utf8mb4',
        debug: true
    });
}

// 新建查询连接
async function querySql(sql, params = []) {
    const conn = await connect();
    try {
        const [rows, fields] = await conn.execute(sql, params);
        conn.end(); // 释放连接
        return { affectedRows: rows.affectedRows, rows }; // 返回受影响的行数和查询结果
    } catch (e) {
        conn.end(); // 释放连接
        throw e; // 抛出异常
    }
}

module.exports = {
    querySql,
};