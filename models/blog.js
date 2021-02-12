const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    datetime:{
        type:Date,
        required:false
    },
    isVisible:{
        type:Boolean,
        required:true,
        default:0
    }
},{timestamps:true});

//model blog
const Blog =mongoose.model('Blog',blogSchema);

module.exports=Blog;