const mongoose = require("mongoose")

const connDb = async (req,res) => {
    try {
        await mongoose.connect("mongodb+srv://mehulkalathiyainfotech:euMEtsN4B8ZfmXCk@cluster0.lhctupx.mongodb.net/blog")
            .then(()=>console.log("DB Connected..."))
        
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = connDb;