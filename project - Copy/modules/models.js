const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let studentUserSchema = new Schema({
	username:String,
	email:String,
	mobile:Number,
	password:String,
	Address:String,
	branch:String,
	percentage_of_SSC:Number,
	percentage_of_HSC:Number,
	percentage_of_BE:Number,
	skills:String,
	time:Date
});

let studentUser = mongoose.model('studentUser',studentUserSchema);

module.exports = studentUser;