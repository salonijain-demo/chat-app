const models = require('../model/schema');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.Registration = async function(req, res) {
  const newUser = new models.User ({
    ...req.body
  })
  await models.User.findOne({userEmail: req.body.userEmail}, async function(task, error){
    if(task){
      res.status(301).json({message: 'This Email Id is already registered'})
    } else {
        let count = await models.User.count()
        newUser['userId'] = `UI${++count}`  
        bcrypt.hash(req.body.userPassword, 10, function(error,hash){
          if(hash){
            newUser.userPassword = hash
            newUser.save().then(function(task, error){
              if(task){
                console.log(task)
              } if(error){
                console.log(error)
              }
            })
          } if(error){
            return res.status(500).json({ message: error, status:500 });
          }
        })
    } if(error){
      console.log(error)
    }
  })
}

exports.Login = function(req, res) {
  let email = models.User.findOne({userEmail: req.body.userEmail})
  email.then(function(doc){
    if(doc){
      bcrypt.compare(req.body.userPassword, doc.userPassword, function(err,task){
        if(task){
          let token = jwt.sign({ userEmail: doc.userEmail }, 'secret');
          res.status(200).json({ token: token, userId: doc.userId, message: 'user verified' });
        } else {
          return res.status(500).json({ message: 'Password is not correct' });
        }
      })
    } else {
      return res.status(500).json({ message: 'user email is not registered.' });
    }
  })
  email.catch(function(error) {
    return res.status(501).json({ message: 'some internal error' });
  })
}

exports.getCurrentUser = function(req,res){
  models.User.findOne({userId: req.params.id},function(err,task){
    if(task){
      res.send(task)
    }
    if(err){
      res.send(err)
    }
  })
}

exports.Socket = function(req,res) {
  res.send('server is up and running')
}
