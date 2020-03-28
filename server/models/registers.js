const mongoose = require ('mongoose');
const {Schema} = mongoose;

const registerSchema = new Schema({
    time: {type: String, required: true },
    imageName: {type: String, required: false},
    licensePlate: {type: String, required: false},
    speed: {type: Number, required: true},
    key:      {type: String, reqiured: true}
});

module.exports = mongoose.model('Register', registerSchema);