const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    user: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    key: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);