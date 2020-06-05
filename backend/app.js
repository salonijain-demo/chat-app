var express = require ('express');
var mongoose = require('mongoose');
var cors = require ('cors');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var http = require('http');
var models = require('./model/schema');
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 5000
server.listen(PORT,() => console.log(`Server has started on port ${PORT}`))

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if(user){
      models.Chat.findOne({room: user.room},function(error,task) {
        if(task){   
          console.log(task)    
        } else{
          var newChat = new models.Chat({
            room: user.room,
            users: user.name
          })
          newChat.save().then(function(error,task){
          if(error){
            console.log(error)
          } if(task){
              console.log(task)
            }
          })
        }
      })
    }
    if(error) return callback(error);
      socket.join(user.room);
      var message
      models.Chat.findOne({room:user.room},function(error,task){
        if(task){
          message = task.messages
        }
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, messages: message});
      })
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message', { user: user.name, text: message });
      let sendMessage = {name: user.name, message: message}
      models.Chat.findOneAndUpdate({room: user.room},{$push:{messages: sendMessage}},{new:true},function(err,task){
        if(err){
          console.log(err)
        }
        if(task){
          console.log(task)
        }
      })
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });
  

mongoose.connect('mongodb://localhost/chat', {useNewUrlParser: true}, ()=>
console.log("connected to db"));
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB.');
});

require('./routes')(app);

app.listen(3001, () => {
  console.log('server started')
})