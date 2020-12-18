const express = require('express');
const app = express();

app.set('view engine','ejs')

app.listen(3000);

app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index',{title: 'Home',blogs });
});

app.get('/about',(req,res)=>{
    //res.send('about');
    //res.sendFile(__dirname+'/views/about.html');
    res.render('about',{title:'about'});
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create Blog'});
});

// //redirect
// app.get('/about-us',(req,res)=>{
//     //res.send('about');
//     res.redirect('/about');
// });

//404 page
app.use((req,res)=>{
    //res.send('about');
    //res.status(404).sendFile(__dirname+'/views/404.html');
    res.status(404).render('404',{title:'404'});
});