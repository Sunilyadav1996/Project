const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentUser = require('./models');
const path = require('path');
const fs = require('fs');
let f = 'D:/project/app/js/Demo.js';
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/studentUser');
router.route('/')
.get(function(req,res){
	res.send(studentUser);
})
.post(function(req,res){
	new studentUser({
	username:req.body.name,
	email:req.body.email,
	mobile:req.body.mobile,
	password:req.body.password,
	Address:req.body.address,
	branch:req.body.branch,
	percentage_of_SSC:req.body.ssc,
	percentage_of_HSC:req.body.hsc,
	percentage_of_BE:req.body.be,
	skills:req.body.skills,
	time:req.body.Date
	}).save(function(err,doc){
		if(err){
			res.send(err);
		}else{
		studentUser.findOne({username:req.body.name,email:req.body.email},function(err,user){
		if(err){
			res.send(err);
		}else{	
		fs.writeFileSync(f,"document.getElementById('username').innerHTML = "+JSON.stringify(user.username)+";\n"+
		"document.getElementById('address').innerHTML = "+JSON.stringify(user.Address)+";\n"+
		"document.getElementById('mobile').innerHTML="+JSON.stringify(user.mobile)+";\n"+
		"document.getElementById('email').innerHTML="+JSON.stringify(user.email)+";\n"+
		"document.getElementById('ssc').innerHTML="+JSON.stringify(user.percentage_of_SSC)+";\n"+
		"document.getElementById('hsc').innerHTML="+JSON.stringify(user.percentage_of_HSC)+";\n"+
		"document.getElementById('be').innerHTML="+JSON.stringify(user.percentage_of_BE)+";\n"+
		"document.getElementById('skills').innerHTML="+JSON.stringify(user.skills)+";\n"
		,function(err){
		if(err)throw err;
		
		console.log("Success full Written File");
		fs.close();
		});
		}
		});
			res.sendFile(path.join("D:/project/app/studentUser.html"));
		}
		console.log(doc);
	});
});
module.exports = router;