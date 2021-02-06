//blog_index, blog_details , blog_create_get , blog_create_post , blog_delete
const Blog =require('../models/blog');
const Session=require('../models/session');

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
    if (req.headers.cookie == undefined) {
        res.render('login',{title:'Login' ,error : 'Login first!'});
    }
    else{
        const user_session = req.headers.cookie.split('; ').find(row=>row.startsWith('Session')).split('=')[1];
        Session.findOne({session : user_session})
        .then((result)=>{
            if(result == null){
                res.render('login',{title:'Login',error : 'Login first!'});
            }
            else{
                res.render('create',{title: 'Create-Blog'});            
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

const blog_create_post=(req,res)=>{
    if (req.body.datetime == '') {
        console.log('No future publish');  
        req.body.isVisible = true;
    }
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