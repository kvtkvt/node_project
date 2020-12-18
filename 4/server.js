const http= require('http');
const fs= require('fs');

// const server=http.createServer((req,res)=>{
//     console.log(req.url,'\n',req.method);
//     //not cumplosary to write set header method browser will display html and text.
//     // res.setHeader('content-Type','text/plain')
//     res.write('hakla padkara')
//     // res.write('<p>hellllllllllllllllllllllllllllllllllllloooooooooooooooooooooooooooooooooooooo</p>')
//     // res.write('<p>helloo</p>')
//     res.end();
// })

const server=http.createServer((req,res)=>{
    console.log(req.url);
    
    let path='./views/';
    switch(req.url){
        case '/':
            path +='index.html';
            res.statusCode=200;
            break
        case '/about':
            path +='about.html';
            res.statusCode=200;
            break
        default:
            path +='404.html';
            res.statusCode=404;
    }
    
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            //res.write(data)
            res.end(data);
        }
    })    
})

server.listen(3000,'localhost',()=>{
    console.log('listening on port .....');
})