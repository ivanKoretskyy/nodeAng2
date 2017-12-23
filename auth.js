const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const express = require ('express');

const router  = express.Router();

const checkAuthenticated =(req,res,next) => {
    debugger;
    if (!req.header('authorization')) {
            return res.status(401).send({message: 'Unauthorized. Missing Auth Header'});
        }

        let token  = req.header('authorization').split(' ')[1];
        console.log(JSON.stringify(req.header('authorization'),null,2));
        console.log(JSON.stringify(req.header('authorization'),null,2));
       
        console.log('-------------')
        console.log(token)
        let payload = jwt.decode(token,'123');
    if(!payload) {
        return res.status(401).send({message: 'Unauthorized. Auth Header Invalid'})
    }
    req.userId= payload.sub;
    next();
    }

router.post('/register', (req,res) => {
        let userDate = req.body;
         let user = new User(userDate);
         user.save((err,result) => {
             if(err){
                 console.log(err);
             } else {
                res.sendStatus(200)
             }
             
         })
          
        });

router.post('/login',  async (req,res) => {
        console.log('get request login    ');
        let loginDate = req.body;
        let user = await User.findOne({email: loginDate.email});
        console.log(user);
        let payload = {sub: user._id};
        let secret = '123';
        if(!user ){
            return res.status(401).send({message: 'incorrect username or password'})
        }
        bcrypt.compare(loginDate.password,user.password,(error, success) => {
            if(error) {
                return res.status(401).send({message: 'incorrect username or password'}) 
            }
            console.log('success');
            let token = jwt.encode(payload,secret);
            
            res.status(200).send({token: token}); 
        })
    
        
    
    });


    let auth = {
        router,
        checkAuthenticated

    }
module.exports = auth;
