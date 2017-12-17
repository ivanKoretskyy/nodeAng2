const mongoose  = require('mongoose');


module.exports = mongoose.model('Message',{
    text: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});