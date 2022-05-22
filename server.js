const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

var videoID = "4VxdufqB9zg"
var currentTime = 0;

io.on('connection', (socket) => {
  socket.on('getVideo', function() {
    socket.emit("changeVideo", videoID)
  })

  // Synchronization Messages
  socket.on('changeVideo', function(videoID) {
    socket.broadcast.emit("changeVideo", videoID)
    socket.emit("changeVideo", videoID)
  })

  socket.on('seekVideo', function(time) {
    socket.broadcast.emit("seekVideo", time)
    socket.emit("seekVideo", time)
  })

  socket.on('pauseVideo', function() {
    socket.broadcast.emit("pauseVideo")
    socket.emit("pauseVideo")
  })

  socket.on('playVideo', function() {
    socket.broadcast.emit("playVideo")
    socket.emit("playVideo")
  })
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});