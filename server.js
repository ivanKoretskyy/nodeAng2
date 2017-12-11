const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
let app  = express();
const posts = [  {"message": "message1rte"},  {"message": "message2"}];


const User = require('./models/user');

app.use(cors());
app.use(bodyParser.json())
app.get('/posts',(req,res) => {  res.send(posts)});

app.post('/register',(req,res) => {
    let userDate = req.body;
     let user = new User(userDate);
     user.save((err,result) => {
         if(err){
             console.log(err);
         } else {
            res.sendStatus(200)
         }
         
     })
      
    }
    );

app.post('/login', async (req,res) => {
    let userDate = req.body;
    let user = await User.findOne({email: userDate.email});
    console.log(user);
    let payload = {};
    let secret = '123';
    if(!user || userDate.password !== user.password){
        return res.status(401).send({message: 'incorrect username or password'})
    }
    let token = jwt.encode(payload,secret);
    
    res.status(200).send({token: token});

})

    mongoose.connect('mongodb://ivanKoretskyy:Irak+911@ds133476.mlab.com:33476/ang_node',{useMongoClient: true}, (err) => {
        if(!err) {
            console.log("connected to mongo")
        }
    })
app.listen(3000);