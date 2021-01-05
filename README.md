# My aim for this project.

I have not used more library or implemented so much functionality, my focus was only on

* Want to Use MVC Apraoch. 
* Famalier with NODE.JS (async,chaining,promise).
* Getting used to with Express.
* Getting used to with mongoose(crud functionality).

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
`req.params.id` from request url we are storing blog id to id variable.

`findById(id)` is used to find the blog from database.

`Then` and `Catch` method is chained to findbyid method.we can say it is using  try and catch block in code.

`res.render` passed title and result to the view.

## Version
(detail's from package.json)

node version --> 14.15.1

nodemon version -->2.0.6

npm -->6.14.8