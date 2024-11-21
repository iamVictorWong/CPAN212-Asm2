require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");   
const recipeRouter = require("./routers/recipes_router");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_KEY); 
const db = mongoose.connection;

db.once("open", () => {
    // Check connection
    console.log("Connected to MongoDB");
  });

db.on("error", (err) => {
// Check for DB errors
console.log("DB Error");
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", recipeRouter);
app.get("/", (req, res) => {
    res.send("Welcome to our server");
  });

  
app.listen(PORT, () => {
console.log(`http://localhost:${PORT}`);
});


app.use("", (req, res) => {
res.status(404).send("Page not found");
});