require('dotenv').config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/db")

const app = express();
const port = 3000 || process.env.PORT;

//db connect
connectDB();

app.use(express.static('public'));

//Template Engine
app.use(expressLayout);
app.use(express.static('public'));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs")

app.use("/", require("./server/routes/main"));

app.listen(port, ()=>{
    console.log(`App is listening on ${port}`)
})

