# Simple Node blog app

User can add, view and delete blog, while adding blog user can set title , snippet and blog content.

Blog is sorted by time created and displayed in BLOG page. 

By clicking any blog user can view in detail and can delete.

# My aim for this project.

* Famalier with NODE.JS (async,chaining,promise) and EXPRESS.
* Use MVC Apraoch. 
* Getting used to with mongoose(crud operation).
* Clean code and readable code.
* Server side templating EJS.

<!-- ## Mvc Detail

<!-- i used mvc approach for this project.

controller -> blogcontroller.js

model -> blog.js

views -> all views pages -->

<!--
## blog_detail Function Explain.

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
-->

## Version
(detail's from package.json)

node version --> 14.15.1

nodemon version -->2.0.6

npm -->6.14.8