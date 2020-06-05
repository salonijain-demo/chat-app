var Query = require('./controller/query');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
  app.post('/registration', Query.Registration);
  app.post('/login', Query.Login);
  app.get('/get_current_user/:id',Query.getCurrentUser)
  app.get('/',Query.Socket);
};