import { User } from '../classes/User';

var express = require('express');
var router = express.Router();
var JWT = require('../controllers/JWT');
var CookieMaker = require('../controllers/CookieMaker');

var UserHandler = require('../controllers/UserHandler');

router.post('/registration', JWT.check, (req: any, res: any) => {
  UserHandler.registration(req).then((response: any) => {
    if (response === 201) {
      res.status(201).send('Success');
    } else {
      res.status(500).send('Server Failed. Please contact Support');
    }
  });
});

router.post('/login', (req: any, res: any) => {
  UserHandler.login(req).then((response: any) => {
    if (response !== 401 && response !== 500) {
      const token = JWT.generate(
        response.id,
        response.email,
        response.password
      );
      const cookie = CookieMaker.createCookie(token);
      const fullUser = new User(response);

      res.cookie(cookie.name, cookie.token, cookie.options).send(fullUser);
    } else {
      res.status(401).send('Unauthorized');
    }
  });
});

router.delete('/delete', JWT.check, (req: any, res: any) => {
  UserHandler.deleteUser(req).then((response: any) => {
    if (response === 200) {
      res.status(200).send('Success');
    } else {
      res.status(500).send('Server Failed. Please contact Support');
    }
  });
});

router.post('/update', JWT.check, (req: any, res: any) => {
  UserHandler.updateUser(req).then((response: any) => {
    if (response === 200) {
      res.status(200).send('Success');
    } else {
      res.status(500).send('Server Failed. Please contact Support');
    }
  });
});

module.exports = router;
