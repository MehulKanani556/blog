const jwt = require("jsonwebtoken")
const User = require("../model/userModel")


exports.auth = async (req, res, next) => {
    try {

        const header = req.headers.authorization
        console.log(header);
        if (!header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing Token" })
        }
        const token = header.split(" ")[1];


        const decoded = await jwt.verify(token, process.env.JWT)
        const user = await User.findById(decoded.id)
        req.user = user;


        console.log(decoded);
        next();



    } catch (error) {
        res.status(500).json({ error })
    }
}