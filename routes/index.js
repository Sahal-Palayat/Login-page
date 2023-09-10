var express = require('express');
var router = express.Router();
let session = require('express-session');
const nocache = require('nocache');
let body = require('body-parser');

// Initialize session variables


router.use(nocache());

router.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
}));

let user = {
  name: "Sahal",
  email: "sahal@gmail.com",
  password: "sahal123"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logged) {
    res.redirect('/home');
  } else {
    res.render('index');
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});

router.post('/home', (req, res, next) => {
  let data = req.body;
  if (data.email === user.email) {
    if (data.password === user.password) {
      req.session.user = data.email;
      req.session.logged = true;
      res.redirect('/home');
    } else {
      res.redirect('/');
    }
  } else {
    res.send('Invalid Username...!');
  }
});

router.get('/home', (req, res, next) => {
  if(req.session.logged) {
    res.render('home', { User: req.session.user });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
