const express = require('express');
const path = require('path');
const registration = require('./modules/Registration');
const login = require('./modules/login');
const app = express();

app.use(express.static('app'))

app.get('/',function(req,res,next){
	res.sendFile(path.join(__dirname+"/app/index.html"));
	});
	
app.get('/index',function(req,res,next){
	res.sendFile(path.join(__dirname+"/app/index.html"));
});

app.get('/register',function(req,res,next){
res.sendFile(path.join(__dirname+"/app/register.html"));
});

app.get('/student',function(req,res,next){
	res.sendFile(path.join(__dirname+"/app/student.html"));
});

app.get('/company',function(req,res,next){
	res.sendFile(path.join(__dirname+"/app/company.html"));
});


app.use('/login',login);
app.use('/Registration',registration);

app.listen(3000,function(){
console.log("Your are listen 3000 port:");
});