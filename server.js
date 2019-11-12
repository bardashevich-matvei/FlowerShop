var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var flowers = require('./routes/flowers');
var catalog = require('./routes/catalog');
var orders = require('./routes/orders');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/flowershop'
    })
}));

app.use('/', routes);
app.use('/flowers', flowers);
app.use('/catalog', catalog);
app.use('/orders', orders);

db.connect('mongodb://localhost:27017/flowershop', function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function () {
        console.log('App started on 3012');
    });
});