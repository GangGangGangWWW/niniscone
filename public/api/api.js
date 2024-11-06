
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// 封装get方法
function get(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/users',
            type: 'GET',
            data: {
            },
            success: function (res) {
                resolve(res)
                console.log(res, '获取到了数据');

            },
            error: function (err) {
                reject(err)
                console.log(err, '获取数据失败');

            }
        })
    })

}