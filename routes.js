const express=require('express');
const fs=require('fs');
const hbs=require('hbs');
var app=express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'\\views\\partials')
app.use((req,res,next)=>{
var now=new Date().toString();
var log=now+':'+req.method+' '+req.url;
	fs.appendFileSync('log.log',log+'\r\n');
	next();
})
app.use((req,res,next)=>{
	res.render('maintance',{
		text:'Sorry'
	});
})
//console.log(__dirname+'\\views\\partials');
hbs.registerHelper('year',()=>{
	return new Date().getFullYear();
})
hbs.registerHelper('toUpper',(text)=>{
	return text.toUpperCase();
})
app.get('/',(req,res)=>{res.send({name:"kaki",age:24});});
app.get('/update',(req,res)=>{res.send("<h1>Update</h1>");});
app.get('/help',(req,res)=>{res.render('help.hbs',{
	text:"help",
})})
app.use(express.static(__dirname));
app.listen(3000);