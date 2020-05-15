const mongoose = require('mongoose');
const {Schema} = mongoose;

const registerSchema = new Schema({
    pointName: {type: String, required: true},
    type: {type: String, required: true},
    key: {type: String, required: true},
    speed: {type: Number, required: true},
    date: {type: Date, required: false},//yyyy-mm-ddTHH:MM:ss
    image: {type: String, required: true},
    plates: {type: String, required: false}
});

module.exports = mongoose.model('Registro', registerSchema);