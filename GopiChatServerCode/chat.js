var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var noOfClients = 0;
var map= {};
io.on('connection',function(socket){
    noOfClients++;
    console.log('connected clients '+ noOfClients);
//    socket.emit('serverEvent', {msg:'Server sending message'});

    socket.on('userEntered', function(data){
        if(isNonBlank(data.userName)){
            if((data.userName) in map) {
                socket.emit('serverEvent',{msg:'Already this userexists. Please choose different userName'});
            } else {
                map[data.userName] = socket.id;
                socket.emit('userLoggedIn',{status:'success', userName: data.userName, socketId: socket.id } );
            }
        }
    })

    socket.on('clientMessageSent', function(data){
//        io.sockets.in(data.sendBy).
           io.sockets.emit('messageBroadcast', {userName: data.sendBy, message: data.message});
    })
    socket.on('disconnect', function(){
        noOfClients--;
        console.log('disconnected clients ' + noOfClients);
    })
})

app.get('/',function(req, res){
    res.sendfile('chatapp.html');
})

http.listen(3000, function(){
    console.log('listening on port 3000');
})

function isNonBlank(str) {
    return !(!str || /^\s*$/.test(str));
  }
