const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    description: String
});

userSchema.pre('save', function(next) {
    let user = this;

    if(!user.isModified('password')) {
        return next();
    }
    console.log('gona bcrypt')
    bcrypt.genSalt()
    bcrypt.genSalt(10,(err,salt) => {
        if(err) {
            return next(err);
        }
        bcrypt.hash(user.password,10,(err,hash)=> {
            if(err){
                return next(err)
            }
            user.password =hash;
            next();
        }) 
       
    })
   

})

module.exports = mongoose.model('User', userSchema );
