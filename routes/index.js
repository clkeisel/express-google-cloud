const express = require('express');
const app = express();
var router = express.Router();

router.get('/', (req, resp) => {
    resp.render('index', {title: 'Hello World!'});
});

router.get('/resume', (req, resp) => {
    resp.render('resume', {title: 'Clay Keisel'});
});

router.get('/blog', (req, resp) => {
    resp.render('blog');
});

module.exports = router;