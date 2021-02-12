const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    session:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
},{timestamps:true});

//model session
const Session =mongoose.model('Session',sessionSchema);
module.exports=Session;