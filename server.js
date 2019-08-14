const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=> {
    console.log('a user connected');
    socket.on('disconnect', ()=> {
        console.log('user disconnected')
    });

    socket.on('chat message', (msg)=> {
        io.emit('chat message', msg);
    })

    socket.broadcast.emit('hi')
});

http.listen(port, ()=> {
    console.log('listening on *:3000');
});