# My aim for this project.

I have not used more library or implemented so much functionality, my focus was only on.

* Famalier with NODE.JS (async,chaining,promise).
* Getting used to with Express.
* Want to Use MVC Apraoch. 
* Getting used to with mongoose(crud operation).
* Clean code readable code.
* Server side templating EJS.

## Mvc Detail

<!-- i used mvc approach for this project.

controller -> blogcontroller.js

model -> blog.js

views -> all views pages -->

Coming soon.......

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
`req.params.id` request url we are storing blog id to id variable.

`findById(id)` is used to find the blog from database.

`Then` and `Catch` method is chained to findbyid method.we can say it is using  try and catch block in code.

`res.render` it render's detail page with passed data.view get data and ejs generates page and send response.

## Version
(detail's from package.json)

node version --> 14.15.1

nodemon version -->2.0.6

npm -->6.14.8