const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const studentUser = require('./models.js');
const bodyParser = require('body-parser');
const fs = require('fs');

let f = 'D:/project/app/js/Demo.js';
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/studentUser');
let db = mongoose.connection;

router.route('/')

.post(function(req,res){
	
var email = req.body.email;
var password = req.body.password;

function getAddress(str){
	var arr = [];
	for(var i = 0;i<str.length;i++){		
		if(str[i]==','){
			arr.push(',<br/>');
		}else{
			arr.push(str[i]);
		}
	}
	return arr.join("");
}

studentUser.findOne({email:email,password:password},function(err,user){
if(err){
	res.send(err);
}else{
	if(!user){
		res.send("There is no such users");
	}else{
		fs.writeFileSync(f,"document.getElementById('username').innerHTML = "+JSON.stringify(user.username)+";\n"+
		"document.getElementById('address').innerHTML = "+getAddress(JSON.stringify(user.Address))+";\n"+
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
		
		res.sendFile("D:/project/app/studentUser.html");
	}
}
});
});

module.exports = router;
