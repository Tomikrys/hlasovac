var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var clicks = 0;
var name_time_clicks = ["Tom", 1];
var usersall = 0;
var users = 0;
var count = 0;
var name_count = ["Tom", 1];
var name_users = ["Tom", 1];
var userId;




app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var express = require('express');
var app = express();
app.use('/static', express.static('public'));

io.on('connection', function (socket) {
    //update poèítaèe klikù
    io.emit('writeclicks', clicks);
    // pøidání uživatele do poèítadla
    usersall += 1;
    io.emit('usersall', usersall);
    //vypsání všech uživatelù do tabulky
    users = 0;
    io.emit('checkusers');
    //Pøi odpojení odebrání uživatele
    socket.on('disconnect', function () {
        usersall -= 1;
        io.emit('usersall', usersall);
        //i z tabulky
        users = 0;
        io.emit('checkusers');
    });
    // pøi kliknutí na button odeslání jména
    socket.on('clicked', function (name_time) {
        clicks += 1;
        name_time_clicks[0] = name_time[0];
        name_time_clicks[1] = name_time[1];
        name_time_clicks[2] = clicks;
        io.emit('clicked', name_time_clicks);
    });
    //èistka tabulky
    socket.on('clear', function () {
        clicks = 0;
        io.emit('cleared');
        io.emit('writeclicks', clicks);
    });
    //získání jmen pøipojených uživatelù
    socket.on('username', function (name) {
        users += 1;
        name_users[0]=name;
        name_users[1]=users;
        io.emit('userslist', name_users);
    });
    //reset tabulky pøipojených
    socket.on('updateusers', function () {
        users = 0;
        io.emit('checkusers');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
