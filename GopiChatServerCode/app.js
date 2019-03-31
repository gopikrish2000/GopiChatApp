var app = require('express')();
var http = require('http').Server(app);
var ioParent = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

//  https://www.tutorialspoint.com/socket.io/socket.io_chat_application.htm

var clients = 0;
//var io = ioParent.of('/firstNameSpace');  // can define nameSpaces  ;; nodemon app.js to run the app.
var io = ioParent;
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   clients++;
   console.log('A user connected1 count ' + clients);

   ioParent.sockets.emit('broadcast', { description: " no of current connected clients is " + clients});

   /*  setTimeout( function(){     // send event with delay use this.
   		// socket.send('Gopi my message');
   		socket.emit('serverEvent', { id: 1, name: "nameOfVydehi"});
   }, 4000);   */
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
   	clients--;
      console.log('A user disconnected count ' + clients );
   });

   socket.on('message', function(data){
   	 console.log('A message send by CLIENT ' + data);
   });

   socket.on('clientEvent', function(data){
   	console.log('ClientSpecificEvent with data ' + data.message);
   });

   socket.on('connect_failed', function() {
      document.write("Sorry, there seems to be an issue with the connection!");
   });
});


http.listen(3000, function() {
   console.log('listening on *:3000');
});

/* connecting states on socket
Connect − When the client successfully connects.
Connecting − When the client is in the process of connecting.
Disconnect − When the client is disconnected.
Connect_failed − When the connection to the server fails.
Error − An error event is sent from the server.
Message − When the server sends a message using the send function.
Reconnect − When reconnection to the server is successful.
Reconnecting − When the client is in the process of connecting.
Reconnect_failed − When the reconnection attempt fails.*/
