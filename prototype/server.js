var express = require('express');
var app = express();

// static folder
app.use(express.static('public'))

// route for the index page
app.get('/home', function(req, res){
    res.sendFile("index.html",{ root: __dirname + "/public"});
});

// route for the ratings page
app.get("/ratings", function(req, res){
    res.sendFile("ratings.html",{ root: __dirname + "/public" })
});

// route for the login page
app.get("/login", function(req, res){
    res.sendFile("login.html",{ root: __dirname + "/public" })
});

// route for the my cities page
app.get("/myCities", function(req, res){
    res.sendFile("mycities.html",{ root: __dirname + "/public" })
});

// cannot get page route
app.use(function (req, res, next) {
    res.send("This page does not exist!")
});
app.listen(8080);