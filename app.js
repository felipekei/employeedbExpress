const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const employeeRoutes = require("./controllers/employeeController"); 
const methodOverride = require("method-override");
const app = express();

// Parsing JSON and url-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// View engine for setup for ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to handle PUT/DELETE
app.use(methodOverride("_method"));

// Routes
app.get('/', (req, res) => {
    res.redirect('/employee');
  });
  
app.use("/employee", employeeRoutes)

// Connections
mongoose.connect("mongodb://localhost:27017/ass5")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.listen(3000, () => console.log("We are Connected..."))