require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser");
const session = require("express-session");

const mongoose = require("mongoose");

// import connect-mongo and pass session
const MongoStore = require("connect-mongo"); 
const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();
const { isActiveRoute } = require("./server/helpers/routeHelpers");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    mongooseConnection: mongoose.connection,
    collectionName: "sessions",
});

// Session middleware
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

// Template Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.locals.isActiveRoute = isActiveRoute;

// Define routes
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});
