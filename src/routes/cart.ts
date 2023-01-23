var express = require('express');
var router = express.Router();
var axios = require('axios');
var JWT = require('../controllers/JWT');

const cartHandler = require('../controllers/cartHandler');

router.post('/update', JWT.check, async (req: any, res: any) => {
  const cart = await cartHandler.update(req.body);
  res.status(200).send(cart);
});

module.exports = router;
