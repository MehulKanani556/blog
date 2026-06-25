const express = require("express");
const { register, login, getUsers, deleteUser, updateUser } = require("../controller/auth");
const { create, updatePost, deletePost, AllPost } = require("../controller/postCtrl");
const { auth } = require("../middleware/auth");
const upload = require("../middleware/upload");

const route = express.Router();

route.post("/register",register)
route.post("/login",login)
route.get("/get-users",getUsers)
route.delete("/delete-user/:id",deleteUser)
route.put("/update-user/:id",updateUser)

route.post("/create-post",auth,upload.single("photo") ,create);
route.post("/update-post/:id",auth,upload.single("photo"),updatePost)
route.delete("/delete-post/:id",auth,deletePost)
route.get("/get-posts",AllPost)


module.exports = route;