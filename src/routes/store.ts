var express = require('express');
var router = express.Router();
var axios = require('axios');
var JWT = require('../controllers/JWT');

const storeHandler = require('../controllers/storeHandler');

router.get('/items', JWT.check, async (req: any, res: any) => {
  const url = storeHandler.UrlConstructor(req.query);

  try {
    const items = await axios.get(url);

    if (items.data.length) {
      res.status(200).send(items.data);
    } else {
      res.status(204).send('No items found');
    }
  } catch {
    res.status(500).send('Internal server error');
  }
});

router.get('/item/:id', JWT.check, async (req: any, res: any) => {
  try {
    const item = await axios.get(
      `https://fakestoreapi.com/products/${req.params.id}`
    );
    if (item.data) {
      res.status(200).send(item.data);
    } else {
      res.status(204).send('No item found');
    }
  } catch {
    res.status(500).send('Internal server error');
  }
});

router.get('/categories', JWT.check, async (req: any, res: any) => {
  try {
    const categories = await axios.get(
      'https://fakestoreapi.com/products/categories'
    );
    if (categories.data) {
      res.status(200).send(categories.data);
    } else {
      res.status(204).send('No categories found');
    }
  } catch {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
