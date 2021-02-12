const express= require ('express');
const mongoose= require('mongoose');
const Blog =require('./models/blog');
const User =require('./models/user');
const Session = require('./models/session');
const app= express();
const crone=require('node-cron');
const Bcrypt=require('bcrypt');
const blogroutes = require('./routes/blogroutes');
const crypto=require('crypto');

app.set('view engine','ejs');

//Url encoded for post form data.
app.use(express.urlencoded({extended:true}));

//Connection url
//const dburi='mongodb+srv://mongotest:UpgMIg9auiHkhbhg@cluster0.epfss.mongodb.net/node?retryWrites=true&w=majority';
const dburi='mongodb://127.0.0.1:27017';

//Connect to db
mongoose.connect(dburi,{ useNewUrlParser: true, useUnifiedTopology : true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));


//Crone Scheduled for every hour.
crone.schedule('*/60 * * * *', (err) => {
    Blog.updateMany({datetime:{$lte: new Date().toLocaleString()}},{isVisible:1})
    .catch((err)=> {
        console.log(err);
    });
    console.log('Crone !!!!');
});

//Home page
app.get('/',(req,res)=>{
    Blog.find({isVisible:1}).limit(5)
    .then((result)=>{
        res.render('index',{title:'Home',blogs : result});
    })
    .catch((err)=>{
        console.log(err);
    })
});

//About page
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

//Blog routes
app.use('/blogs',blogroutes);

//Signup
app.get('/signup',(req,res)=>{
    res.render('signup',{title:'Signup'});
});

//Signup
app.post('/signup',(req,res)=>{
    req.body.password=Bcrypt.hashSync(req.body.password,10);
    const user_detail = new User(req.body);
    user_detail.save()
    .then((result)=>{
        res.render('login',{title:'Login',error:'Signup Success,Please Login To Publish Blog.'});
    })
    .catch((err)=>{
        console.log(err);
    });
});

//Login
app.get('/login',(req,res)=>{
    res.render('login',{title:'Login',error:'Login'})
});

//Login Verify credentials
app.post('/login',(req,res)=>{
    var random_sessionid = crypto.randomBytes(32).toString('hex');
    User.findOne({email: req.body.email})
    .then((result)=>{
        if(result== null){
            console.log("username not exist!!!");
            res.render('login',{title:'Login',error:'User does not exist,Please Signup'});
        }
        else{
            if(!Bcrypt.compareSync(req.body.password,result.password)){
                console.log("password does not match");
                res.render('login',{title:'Login',error: 'Wrong password.'});
            }
            else{
                req.body.session = random_sessionid;
                const session = new Session(req.body);
                session.save();
                res.cookie("Session",random_sessionid);
                res.cookie("Name",result.name);                
                res.redirect('/blogs/create');
            }
        }
    })
    .catch((err)=>{
        console.log(err);
    })
});

//Change Password.
app.get('/changepassword',(req,res)=>{
    if (req.headers.cookie == undefined){
        res.render('login',{title:'Login',error :'Login first!'});
    }
    else{
        res.render('changepassword',{title: 'Change Password'})
    }
});

//Post Change Password.
app.post('/changepassword',(req,res)=>{
    const user_session = req.headers.cookie.split('; ').find(row=>row.startsWith('Session')).split('=')[1];
    var new_password= Bcrypt.hashSync(req.body.newpassword,10);
    Session.findOne({session :user_session})
    .then((result)=>{
        var user_email=result.email;
        User.findOne({email : result.email})
        .then((result)=>{
            if(!Bcrypt.compareSync(req.body.password,result.password)){
                console.log("password does not match");
                res.clearCookie("Name");
                res.clearCookie("Seasion");
                res.render('login',{title:'Login',error:'Current Password Does Not Match.'});
            }
            else{
                User.updateOne({email : user_email},{password : new_password})
                .then((result)=>{
                    console.log('password matched.');
                    res.clearCookie("Name");
                    res.clearCookie("Session");                
                    res.render('login',{title:'Login',error: 'Password changed,please login.'});
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })    
});

//Logout
app.get('/logout',(req,res)=>{
    //remove session from cookie
    if (req.headers.cookie == undefined) {
        res.render('login',{title: 'Login',error: 'Logout success.'});
    }
    else{
        const user_session = req.headers.cookie.split('; ').find(row=>row.startsWith('Session')).split('=')[1];
        Session.deleteOne({session : user_session})
        .then((result)=>{
            res.clearCookie("Name");
            res.clearCookie("Session");
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
});

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404 page not found.'});
});