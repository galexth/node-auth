const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const HomeController = require('../controllers/HomeController');

router.get('/', function (req, res) {
    HomeController.index(req, res);
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', (req, res) => {
    AuthController.register(req, res);
});

router.post('/login', (req, res) => {
    AuthController.login(req, res);
});

module.exports = router;