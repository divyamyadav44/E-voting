const express = require("express");
const mysql = require("mysql");
const dotenv= require("dotenv");
const path= require("path");

dotenv.config({ path: './.env'})

const app= express();

const db= mysql.createConnection({

    host: 'localhost',
    user:  'root',
    password: '',
    database: 'nodejs-login',

});

const publicDirectory= path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine' , 'hbs');

db.connect( (error)=> {
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("connected");
    }

});



// app.get("/" , (req , res) =>{

//     //res.send("<h1>homepage</h1>")
//     res.render("index");
// });

// app.get("/register" , (req , res) =>{

//     //res.send("<h1>homepage</h1>")
//     res.render("register");
// });

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, ()=>{
    console.log("server started");
})