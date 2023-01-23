import { randomUUID } from 'crypto';
import { createCookie } from './controllers/CookieMaker';

var cors = require('cors');
var cookieParser = require('cookie-parser');
var express = require('express');

const connection = require('./controllers/connection');
var JWT = require('./controllers/JWT');

var app = express();
connection.startServer(app);

// Middlewares
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/test', async (req: any, res: any) => {
  const token = JWT.generate('string', 'string', randomUUID());
  const cookie = await createCookie(token);
  res.cookie(cookie.name, cookie.token, cookie.options).send(cookie);
});

app.get('/testjwt', JWT.check, (req: any, res: any) => {
  res.send('Hello world!!!');
});

const user = require('./routes/user');
app.use('/user', user);

const store = require('./routes/store');
app.use('/store', store);

const cart = require('./routes/cart');
app.use('/cart', cart);
