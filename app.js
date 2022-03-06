// call the 'http' library from Node
// const http = require('http'); 
// const fs = require('fs');
// const { parse } = require('path/posix');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes); // Only jump to admin when "/admin" is beginning of request
app.use(shopRoutes);

//404 Page Not Found
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


// app.use((req, res, next) => {
//     console.log('In the middleware');
//     res.send('<h1>Hello from Express!</h1>');
// });

// import routes.js file 
// const routes = require('./routes');

// If requested, use this function
// const server = http.createServer(app);

// Browser localhost: 3000 for run after running in IDE
// server.listen(4000);
// OR instead of lines 34 & 37
app.listen(4000);