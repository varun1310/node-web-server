const express= require('express');
const hbs = require('hbs');
const fs = require('fs');


var app =express();

hbs.registerPartials(__dirname +'/views/partials');

app.set('view engine','hbs');

app.use(function(req,res,next){
    res.render('maintainence.hbs');
});

app.use(express.static(__dirname +'/public'));



app.use(function(req,res,next){
    var now = new Date().toString();

    var log = (now + req.method +req.url);
    fs.appendFile('server.log',log + '\n',function(err){
        if(err){
            console.log('unable tto append server log');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', function(){
     return new Date().getFullYear()
});

hbs.registerHelper('screamIt',function(text){
    return text.toUpperCase();
})

app.get('/',function(req,res){
    // res.send('<h1>Hello express</h1>');
   res.render('home.hbs',{
       pageTitle : 'Home page',
       welcomeMessage : 'welcome to the home page'
    
   });
   

});

app.get('/about',function(req,res){

    res.render('about.hbs',{
        pageTitle: 'About page'
    });
});

app.get('/bad',function(req,res){
    res.send({
        errorMessage : 'page loading problem' 
    })
});

app.listen(3000,function(){
    console.log('server is up on port 3000');
});