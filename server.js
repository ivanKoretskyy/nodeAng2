const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
const jwt = require('jwt-simple');
let app  = express();
const bcrypt = require('bcrypt');
const posts = [  {"message": "message1rte"},  {"message": "message2"}];
const auth = require('./auth');
const Message = require('./models/message');
mongoose.Promise = Promise;

const User = require('./models/user');

app.use(cors());
app.use(bodyParser.json())
app.post('/message',(req,res) => {  
    let messageDate = req.body;
    messageDate.author = '5a2f80086ad9957a1b959226';
    let message = new Message(messageDate);
    message.save((err,result) => {
        if(err){
           return console.err(err);
        } 
           res.sendStatus(200)
        
        
    })
});

app.get('/messages/:authorId', async (req,res) => {
    try{

        const messages = await Message.find({"author":req.params.authorId});
        res.status(200).send(messages);
    }
     catch(err)
    {
        res.sendStatus(500);
        console.error(err);
    }

});

app.get('/users', async (req,res) => {
    try{

        const users = await User.find({},'-password -__v');
        res.status(200).send(users);
    }
     catch(err)
    {
        res.sendStatus(500);
        console.error(err);
    }

});

app.get('/profile/:id', async (req,res) => {
    try{

        const user = await User.findById(req.params.id, '-password -__v');
        res.status(200).send(user);
    }
     catch(err)
    {
        res.sendStatus(500);
        console.error(err);
    }

});

    mongoose.connect('mongodb://ivanKoretskyy:Irak+911@ds133476.mlab.com:33476/ang_node',{useMongoClient: true}, (err) => {
        if(!err) {
            console.log("connected to mongo")
        }
    });

app.use('/auth',auth);
app.listen(3000);