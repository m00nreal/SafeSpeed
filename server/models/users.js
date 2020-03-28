const mongoose = require ('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true },
    password: {type: String, required: true},
    name:     {type: String, required: true},
    key:      {type: String, reqiured: true}
});

module.exports = mongoose.model('User', userSchema);