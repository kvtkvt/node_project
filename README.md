# node_project

Project Details......


# Node Project
This is about Node Project...
* Can Add blog
* Can Delete Blog.
* Can View blog.

## Mvc Detail

i used mvc approach for this project.
controller--> blogcontroller.js
model --> blog.js
views --> all views pages

## Function Detail

```Javascript
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
```
Blog_details has a callback function .
`findById(id)` find the blog from database.

## Version
(package.json)
node version --> 14.15.1
nodemon version -->2.0.6
npm -->6.14.8