const express= require('express');
const blogcontroller=require('../controllers/blogcontroller');
const router = express.Router();

//Blog all page
router.get('/',blogcontroller.blog_index);

//Create blog
router.get('/create',blogcontroller.blog_create_get);

//Blogs detail page
router.get('/:id',blogcontroller.blog_details);

//Blog delete
router.delete('/:id',blogcontroller.blog_delete);

//Add blog
router.post('/',blogcontroller.blog_create_post);

module.exports =router;