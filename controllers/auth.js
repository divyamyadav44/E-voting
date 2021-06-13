const mysql = require("mysql");
const jwt =require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const db= mysql.createConnection({
 
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'nodejs-login',

});

exports.login= async(req ,res)=>{
    try{
     
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).render('login',{
                message:'Please fill credential'
            })
        }
        db.query('SELECT * from user where email=?',[email], async(error, results )=> {
            if(!results || !await bcrypt.compare(password,results[0].password))
            return res.status(400).render('login',{
                message:'credential not match'
            })

        });

    }
    catch(error)
    {
        console.log(error);
    }
}




exports.register = (req,res)=>  {
    console.log(req.body);

    const{ name, email,password,passwordConfirm} =req.body;
   
    db.query('Select email from user where email=?',[email],async (error ,results)=>{

        if(error)
        {
            console.log(error);

        }
        if(results.length>0){
            return res.render('register',{
                message: 'user already register'
            })
        }
        else if(password !==passwordConfirm){
            return res.render('register',{
                message: 'Password Do Not Match'
            })
        }
   
        let hashedPassword= await bcrypt.hash(password,8);
        console.log(hashedPassword);
 
       db.query('INSERT into user SET ?',{name: name, email: email, password: hashedPassword}, (error,results)=>{
        if(error)
        console.log(error);
        else
        {
            return res.render('register',{
                message: 'User Register'
            })
        }

       });

      //  res.send("testing");
    
    } );
    //res.send("Form Submitted");
}