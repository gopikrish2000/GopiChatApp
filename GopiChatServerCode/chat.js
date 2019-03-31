var app = require('express')();
var http = require('http').Server(app);
var ioParent = require('socket.io')(http);


