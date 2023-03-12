const express =  require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const PORT = process.env.PORT || 5001;
const router = require('./router')

const app = express();

app.use(cors());

 
const server = http.createServer(app);

const ios = socketio(server);
const io = ios.of("/first");

io.on("connection", (socket) => {

  console.log("hello world!! .   . . . ")
  socket.on('join', ({name, room}, callback) => {
    console.log("joined......hello world!! .   . . . ", name, room)
    const { error, user } = addUser({id: socket.id, name, room})

    if (error) return callback(error)

    socket.emit('message', {user:"admin", text:`${user.name}, welcome to the room ${user.room}`})
    socket.broadcast.to(user.room).emit('message', {user:"admin", text:`${user.name}, has joined!`})

    socket.join(user.room)

    io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)})
    callback();
    
  })

  socket.on('sendMessage', (message, callback)=> {
    const user = getUser(socket.id);
    console.log(user);
    if (user) {
      io.to(user.room).emit('message',{user: user.name, text: message})
    // io.to(user.room).emit('roomData',{room: user.room, users:getUsersInRoom(user.room)})
    }
    
    
    callback();
  })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit("message", {user:"admin", text:`${user.name} has left`})
      io.to(user.room).emit('roomData',{room: user.room, users:getUsersInRoom(user.room)})
    }
  })
})

app.use(router);

server.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
})