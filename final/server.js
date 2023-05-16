const express = require('express');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const { name } = require('ejs');
//const alert = require('alert');
 
const app = express();
 
//getting mongo db connected
var mongoUrl = 'mongodb://localhost:27017/';
var db;
 
MongoClient.connect(mongoUrl, function (err, database){
    if (err) throw err;
 
    //setting db to the database
    db = database.db("SafeSt");
 
    //create the collection if not already created
    db.createCollection("users", function (err2, res){
        if (err2) {console.log("collection already created")}
    });
 
    app.listen(8080);
});
 
 
 
//static folder
app.use(express.static('public'))
 
//setting up body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
 
 
//ejs setup
app.set('view engine', 'ejs');
 
app.engine('ejs', require('ejs').__express);

//setting up session
app.use(session({ secret: 'SafeStSecret', resave: false, saveUninitialized: false}));
 
//route for the index page
app.get('/home', function(req, res){
    res.render('pages/index');
});
 
//route for the index page
app.get('/', function(req, res){
    //req.res.session.loggedIn = false
    res.render('pages/index');
});
 
//route for the ratings page
app.get("/ratings", function(req, res){
    res.render('pages/ratings');
});
 
//route for the login page
app.get("/login", function(req, res){
    error = false;
    res.render('pages/login');
});

//route for the profile page
app.get("/profile", function(req, res){
    if (req.session.loggedIn){
    req.session.email = req.session.email;
    console.log("profile session" + req.session.email)
    res.render('pages/profile', {
        email: req.session.email,
        isLoggedIn: req.session.loggedIn
    });
    } else {
        error = true;
        res.render('pages/login', {error:error});
    }
});

 

//create account post request
app.post("/createAccount", function (req, res){
    //email and password from the form
    var email = req.body.emailRegInput;
    var password = req.body.passwordRegInput;
 
    //adds the new user  to database
    db.collection('users').findOne({ email:email }, function (err, result) {
        //error handler
        if (err) throw err;

        //if account already exists
        if (!result) {
            db.collection('users').count(function(err2, result2){
                if (err2) throw err2;
                
                //adds the new user to the database
                db.collection('users').insertOne({
                email: email,
                password: password
 
                }, function(err3, result3){
                    if (err3) throw err3;
                }); 
            });
            console.log("Account successfully created")
        } else {
            console.log("Account already created")
        };
    });
    //go back to login page
    res.redirect("/login");
});

//login post request
app.post("/login", function (req, res){
    //inputs from form
    var email = req.body.emailInput;
    var password = req.body.passwordInput;

    //finds the user in database to check password
    db.collection("users").findOne({ email:email}, function (err, result){
        if (err) throw err;

        //if profile isnt found
        if (!result) {
            res.redirect("/login")
            return;
        }

        //checks if the password is correct
        if (result.password == password){
            //sets the session variables
            req.session.loggedIn = true;
            req.session.email = email;

            db.createCollection(email, function (err, res){
                if (err) {console.log("collection already created")}
            });
    
            //when logged in sends user to the mycities page
            db.collection(email).find().toArray(function (err, result){
                if (err) throw err;
                res.render('pages/mycities', {
                    cities: result, 
                    isLoggedIn: req.session.loggedIn
                })
            });
        } else {
            //redirects to login is password is incorrect
            res.redirect("/login")
        };
    });
});

//post request to add city to database
app.post("/addCity", function(req, res){
    //name of the user to create database collection
    var name = req.session.email

    //data from the form
    var cityName = req.body.cityName;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    
    //creates the database collection for the user
    db.createCollection(name, function (err, res){
        if (err) {console.log("collection already created")}
    });

    //adds the city to the database
    db.collection(name).insertOne({
        CityName: cityName,
        Longitude: longitude,
        Latitude: latitude
    }, function (err2, result2){
        if (err2) throw err2;
    });

    //sends the data from database to the mycities page
    db.collection(name).find().toArray(function (err, result){
        if (err) throw err;
        res.render('pages/mycities', {
            cities: result, 
            isLoggedIn: req.session.loggedIn
        })
    });

});


 
//route for the my cities page
app.get("/myCities", function(req, res){
    //if user isnt logged in redirect to home otherwise navigate to myCities
    if (req.session.loggedIn){

        var name = req.session.email

        db.createCollection(name, function (err, res){
            if (err) {console.log("collection already created")}
        });


        db.collection(name).find().toArray(function (err, result){
            if (err) throw err;
            res.render('pages/mycities', {
                cities: result, 
                isLoggedIn: req.session.loggedIn
            })
        });

    } else {
        error = true;
        res.render('pages/login', {error:error});
    }
    
});

//update profile post request
app.post("/profileUpdate", function(req, res){
    //making a query to update the correct profile
    let query = {email:req.session.email};
    //adding the new values to newVals then updating the database with the new information
    newVals = {$set:{}};
    if (req.body.passwordInput != "") newVals.$set.password = req.body.passwordInput
    if (req.body.emailInput != "") newVals.$set.email = req.body.emailInput

    db.collection("users").updateOne(query, newVals, function (err,res){
        if (err) throw err;
        console.log(req.session.email + "details have been updated");
        req.session.email = req.body.emailInput;
        req.session.save();
        console.log(req.session.email)
    });
    res.render('pages/index');
});

//cannot get page route
app.use(function ( req, res, next) {
    res.send("This page does not exist!")
});