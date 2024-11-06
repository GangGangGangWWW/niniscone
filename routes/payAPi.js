const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51Q6s1u08Z1LKSosSrYcRxXzl4o1v6oyihKnhzGRwYCTXmlm3ZQSkmhL4LZ5MHr3LukoVtWMLJNNyjPTK6MUbLaKo00v1RJGNq2');

// 创建Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { amount, currency,name } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: name,
            },
            unit_amount: amount,
          },
          quantity: 1,//商品数量
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html', 
      cancel_url: 'http://localhost:3000/cancel.html',
    });

    res.send({ sessionId: session.id });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;