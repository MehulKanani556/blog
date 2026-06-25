const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    photo:{
        type:String,
        unique:true
    },
    description:{
        type:String,
    },
    
 
})

module.exports = mongoose.model("Post",postSchema)