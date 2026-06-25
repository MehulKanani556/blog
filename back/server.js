const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const route = require("./route/indexRoute")
const connDb = require("./db/db")
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT || 8000
connDb(app);
app.use(cors())
app.use(bodyParser.json())
app.use("/api",route);
app.use("/uploads",express.static("uploads"))

app.listen(port,()=>{
    console.log("Server Running...")
})