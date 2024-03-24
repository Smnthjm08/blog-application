require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const connectMongo = require("connect-mongo")
const session = require("express-session");
const connectDB = require("./server/config/db")
const app = express();
const port = 3000 || process.env.PORT;

//db connect
connectDB();

app.use(express.urlencoded({extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const  MongoStore = connectMongo(session); 

app.use(session({
    secret : "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: process.env.MONGODB_URI
    })
    // cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}))

//Template Engine
app.use(expressLayouts);
//app.use(express.static('public'));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs")

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(port, ()=>{
    console.log(`App is listening on ${port}`)
})

