const express= require ('express');
const mongoose= require('mongoose');
const Blog =require('./models/blog');
const User =require('./models/user');
const app= express();
const crone=require('node-cron');
const blogroutes = require('./routes/blogroutes');

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
crone.schedule('*/20 * * * * *', (err) => {
    Blog.updateMany({isVisible:0},{isVisible:1})
    .catch((err)=> {
        console.log(err);
    });
    console.log('Crone !!!!');
})

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
})

//Signup
app.post('/signup',(req,res)=>{
    const user_detail = new User(req.body);
    user_detail.save()
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    });
})

//Login
app.get('/login',(req,res)=>{
    res.render('login',{title:'Login'})
})

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404 page not found.'});
});