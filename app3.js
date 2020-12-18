const express= require ('express');
const mongoose= require('mongoose');
const Blog =require('./models/blog');
const app= express();

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

//Blog all page
app.get('/blog',(req,res)=>{
    var mysort ={  title : 1};
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index',{title:'Title',blogs : result});
    })
    .catch((err)=>{
        console.log(err);
    })
})

//About page
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

//Create blog
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create-Blog'});
});

//Blogs detail page
app.get('/blogs/:id',(req,res)=>{
    const id= req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('detail',{title:'Blog-Detail',blog : result});
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).render('404',{title: 'Blog not found'});
    })
});

//Blog delete
app.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        console.log('delete');
        res.json({ redirect:'/' });
    })
    .catch((err)=>{
        console.log(err);
    })
})

//Add blog
app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    });
});

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});