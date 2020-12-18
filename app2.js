 const express= require('express');
 const app= express();
 const mongoose= require('mongoose');
 const Blog= require('./models/blog');

 //view engine set
app.set('view engine','ejs');

 const dburi='mongodb+srv://mongotest:UpgMIg9auiHkhbhg@cluster0.epfss.mongodb.net/node?retryWrites=true&w=majority';

mongoose.connect(dburi,{ useNewUrlParser: true, useUnifiedTopology : true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

app.get('/',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('index',{title: 'Home',blogs : result});
    })
    .catch((err)=>{
        console.log(err);
    })    
});

//add blog
app.get('/add-blog',(req,res)=>{
   const blog =new Blog({
       title: 'new blog - 2',
       body:'this is second blog about automobile and technology',
       snippet:'automotive'
   });
   blog.save()
   .then((result)=>{
       console.log('added');
       res.send(result)
   })
   .catch((err)=>{
       console.log(err)
   })
})

//find all blog
app.get('/allblog',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})

//find special blog
app.get('/find',(req,res)=>{
    Blog.findById('5fd4f3e01624e948e4f08257')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })

})   

//select name and age only 
app.get('/findbyselect',(req,res)=>{
    Blog.find({},{_id:0,body:1})
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err);
    })
})