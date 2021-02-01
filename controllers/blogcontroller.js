//blog_index, blog_details , blog_create_get , blog_create_post , blog_delete
const Blog =require('../models/blog');

const blog_index= (req,res)=>{
    var mysort ={  title : 1};
    Blog.find({isVisible:1}).sort({createdAt: -1})
    .then((result)=>{
        res.render('index',{title:'Title',blogs : result});
    })
    .catch((err)=>{
        console.log(err);
    })
}

const blog_details= (req,res)=>{
    const id= req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('detail',{title:'Blog-Detail',blog : result});
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).render('404',{title: 'Blog not found'});
    })
}

const blog_delete= (req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        console.log('delete');
        res.json({ redirect:'/' });
    })
    .catch((err)=>{
        console.log(err);
    })
}

const blog_create_get=(req,res)=>{
    res.render('create',{title: 'Create-Blog'});
}

const blog_create_post=(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports={
    blog_create_post,
    blog_create_get,
    blog_delete,
    blog_details,
    blog_index
}