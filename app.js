const express = require("express");
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


const server = app.listen(8000);
const io = require('socket.io')(server);
console.log("*******TEST*******");


io.on('connection', function (socket) {

    socket.on('posting_form', function (data) {
        console.log(data)
        var random_num = Math.floor((Math.random() * 1000) + 1);
        socket.emit('updated_message', { response: data });
        socket.emit('random_num', { response: random_num });
    });


});

app.get('/', function (req, res) {
    res.render("index");
})





