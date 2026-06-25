const User = require("../model/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const checkUser = await User.find({ email });



        if (checkUser.length !== 0) {
            return res.status(409).json({ message: "User Existed  ..." })
        }
        const hashPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, role, password: hashPass
        })
        const token = await jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "1d" })
        res.status(201).json({ message: "User Register  ...", user, token })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUser = await User.find({ email });


        if (checkUser.length == 0) {
            return res.status(404).json({ message: "User Not Existed  ..." })
        }
        const hashPass = await bcrypt.compare(password, checkUser[0].password);
        console.log();
        if (!hashPass) {
            return res.status(401).json({ message: "Email or Password Incorrect." })
        }

        const token = await jwt.sign({ id: checkUser[0]._id }, process.env.JWT, { expiresIn: "1d" })
        res.status(200).json({ message: "User Login", checkUser, token })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getUsers = async (req, res) => {
    try {

        const user = await User.find();

        res.status(200).json({ message: "User Fetch", user })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
         const user = await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User Deleted", user })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const checkUser = await User.findById(id);


        if (checkUser.length == 0 || !checkUser) {
            return res.status(404).json({ message: "User Not Existed  ..." })
        }
        
        const user = await User.findByIdAndUpdate(id,{name,email},{new:true});

        res.status(200).json({ message: "User updated", user })
    } catch (error) {
        res.status(500).json(error)
    }
}