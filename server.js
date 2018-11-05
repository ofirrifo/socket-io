let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var dashboardIo = io.of('/dashboard');
dashboardIo.on('connection', (socket) => {

  // Log whenever a user connects
  console.log('user connected');

  // Log whenever a client disconnects from our websocket server
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on('dashboard-message', (message) => {
    console.log("Message Received: " + message);
    dashboardIo.emit('dashboard-message', {type: 'new-message', text: convertData(message)});
  });
});

var terminalIo2 = io.of('/terminal');
terminalIo2.on('connection', (socket) => {

  // Log whenever a user connects
  console.log('user connected');

  // Log whenever a client disconnects from our websocket server
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on('terminal-1-message', (message) => {
    console.log("Message Received: " + message);
    terminalIo2.emit('terminal-1-message', {type: 'new-message', text: convertData(message)});
  });


  socket.on('terminal-2-message', (message) => {
    console.log("Message Received: " + message);
    terminalIo2.emit('terminal-2-message', {type: 'new-message', text: convertData(message)});
  });

  socket.on('terminal-3-message', (message) => {
    console.log("Message Received: " + message);
    terminalIo2.emit('terminal-3-message', {type: 'new-message', text: convertData(message)});
  });
});

function convertData(data) {
  return data.replace('\r', '\n\r').replace('\x7f', '\b \b');
}

// Initialize our websocket server on port 5000
http.listen(5000, () => {
  console.log('started on port 5000');
});
