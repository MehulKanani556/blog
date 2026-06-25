const Post = require("../model/postModel")

exports.create = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(title, req.file);
        const photo = req.file ? `http://localhost:8000/${req.file.path}` : "";
        const { role } = req.user || {};

        if (role == "user") {
            return res.status(401).json({ message: "Only Admin Create Post" })
        }
        
        const post =await Post.create({
            title,description,photo
        })

        res.status(201).json({ message: "Post Created", post })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.updatePost = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, description } = req.body;
        const { role } = req.user || {};
        let updateData = {title,description};

        if(req.file){
            updateData.photo = `http://localhost:8000/${req.file.path}`           

        }

        if (role == "user") {
            return res.status(401).json({ message: "Only Admin Update Post" })
        }
        
        const post =await Post.findByIdAndUpdate(id,updateData,{new:true})

        res.status(200).json({ message: "Post Updated", post })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const { role } = req.user || {};

        if (role == "user") {
            return res.status(401).json({ message: "Only Admin Update Post" })
        }
        
        const post =await Post.findByIdAndDelete(id)

        res.status(200).json({ message: "Post Deleted", post })
    } catch (error) {
        
        res.status(500).json(error)
    }
}
exports.AllPost = async (req, res) => {
    try {    
        
        const post =await Post.find()

        res.status(200).json({ message: "Post Fetch", post })
    } catch (error) {
        res.status(500).json(error)
    }
}
