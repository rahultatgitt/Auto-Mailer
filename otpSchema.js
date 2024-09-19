const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const otpSchema = new Schema({
    email: String,
    otp: String
});
module.exports = mongoose.model('otp', otpSchema)