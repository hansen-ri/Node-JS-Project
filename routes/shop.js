const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.send('<h1>Hello From Express!</h1>');
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html')); // build correct path originating from root folder, up one level out of 'routes' folder, then into 'views' folder, and the 'shop.html' file.
});

module.exports = router;