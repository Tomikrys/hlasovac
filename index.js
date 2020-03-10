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
    //update po��ta�e klik�
    io.emit('writeclicks', clicks);
    // p�id�n� u�ivatele do po��tadla
    usersall += 1;
    io.emit('usersall', usersall);
    //vyps�n� v�ech u�ivatel� do tabulky
    users = 0;
    io.emit('checkusers');
    //P�i odpojen� odebr�n� u�ivatele
    socket.on('disconnect', function () {
        usersall -= 1;
        io.emit('usersall', usersall);
        //i z tabulky
        users = 0;
        io.emit('checkusers');
    });
    // p�i kliknut� na button odesl�n� jm�na
    socket.on('clicked', function (name_time) {
        clicks += 1;
        name_time_clicks[0] = name_time[0];
        name_time_clicks[1] = name_time[1];
        name_time_clicks[2] = clicks;
        io.emit('clicked', name_time_clicks);
    });
    //�istka tabulky
    socket.on('clear', function () {
        clicks = 0;
        io.emit('cleared');
        io.emit('writeclicks', clicks);
    });
    //z�sk�n� jmen p�ipojen�ch u�ivatel�
    socket.on('username', function (name) {
        users += 1;
        name_users[0]=name;
        name_users[1]=users;
        io.emit('userslist', name_users);
    });
    //reset tabulky p�ipojen�ch
    socket.on('updateusers', function () {
        users = 0;
        io.emit('checkusers');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
