const Stripe = require('stripe');

const secretKey = 'sk_test_51Q6s1u08Z1LKSosSrYcRxXzl4o1v6oyihKnhzGRwYCTXmlm3ZQSkmhL4LZ5MHr3LukoVtWMLJNNyjPTK6MUbLaKo00v1RJGNq2'; // 替换为你的 Stripe 秘钥

// 初始化 Stripe 客户端
const stripe = new Stripe(secretKey);

module.exports = stripe;