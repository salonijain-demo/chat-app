var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var UserSchema =new Schema({
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  userContact: {
    type: Number
  },
  userAddress: {
    type: String
  },
  userEmail: {
    type: String
  },
  userPassword: {
    type: String
  }
});

User = mongoose.model('User', UserSchema, 'user');

var ChatSchema = new Schema({
  room: {
    type: String
  },
  messages: []
})

Chat = mongoose.model('Chat', ChatSchema, 'chat');

module.exports={
  User:User,
  Chat:Chat
}