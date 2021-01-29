const express= require ('express');
const mongoose= require('mongoose');
const Blog =require('./models/blog');
const app= express();
const blogroutes = require('./routes/blogroutes');

app.set('view engine','ejs');

//Url encoded for post form data.
app.use(express.urlencoded({extended:true}));

//Connection url
const dburi='mongodb+srv://mongotest:UpgMIg9auiHkhbhg@cluster0.epfss.mongodb.net/node?retryWrites=true&w=majority';

//Connect to db
mongoose.connect(dburi,{ useNewUrlParser: true, useUnifiedTopology : true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

//Home page
app.get('/',(req,res)=>{
    Blog.find().limit(5)
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

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404 page not found.'});
});