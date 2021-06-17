const express = require('express');
const router = express.Router();

const { authorize, onAuthorized } = require('../helpers/auth');


const CLIENT_ID = process.env.CLIENT_ID || null;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const VK_TOKEN = process.env.ACCESS_TOKEN
const USER_ID = process.env.USER_ID

const requireAuth = (req, res, next) => {
  if (req.session.accessToken) {
    res.locals.accessToken = req.session.accessToken;
    next();
  } else {
    res.redirect('/auth');
  }
};

router.get('/login/vk', authorize);
router.get('/login/vk/complete', onAuthorized);

router.get('/', (req, res, next) => {
  res.render('pages/index', {
    title: 'Лабораторные СГН3 Пузанова',
    accessToken: req.session && req.session.accessToken || null
  });
});

router.get('/auth', (req, res) => {
  res.render('pages/auth', { title: 'Авторизация ВК', CLIENT_ID });
});

router.get('/lab2', (req, res) => {
  res.render('pages/lab2', { title: 'Lab 2' });
});

router.get('/lab3', (req, res) => {
  res.render('pages/lab3', { title: 'Lab 3', accessToken: VK_TOKEN, USER_ID });
});

router.get('/lab4', (req, res) => {
  res.render('pages/lab4', { title: 'Lab 4', accessToken: VK_TOKEN, USER_ID });
});

router.get('/lab5', (req, res) => {
  res.render('pages/lab5', { title: 'Lab 5-6', accessToken: VK_TOKEN, USER_ID  });
});

router.get('/lab7', (req, res) => {
  res.render('pages/lab7', { title: 'Lab 7', telegramToken: TELEGRAM_TOKEN });
});

router.get('/lab8', (req, res) => {
  res.render('pages/lab8', { title: 'Lab 8-9' });
});

router.get('/lab10', (req, res) => {
  res.render('pages/lab10', { title: 'Lab 10' });
});

router.get('/lab11', (req, res) => {
  res.render('pages/lab11', { title: 'Lab 11' });
});


module.exports = router;
