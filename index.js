const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const helmet = require('helmet')
const path = require('path')


const authRoter = require("./routers/auth");
// const userRoter = require("./routers/user");
const studentRoter = require("./routers/students");
const classRoter = require("./routers/klasat");
const salahRoter = require("./routers/salah");

const cors = require("cors");
const User = require("./models/User");


dotenv.config();
app.use(express.json());

app.use(helmet());

const port = process.env.PORT || 5000;



const allowedOrigin = 'https://mf-vaspitna2008c.onrender.com';

const corsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200, 
};

app.use(cors());

const dbUrl = process.env.MONGO
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
 
}

app.use(express.static(path.join(__dirname, "public")));

// Define the catch-all route to serve the index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/auth", authRoter);
// app.use("/api/users", userRoter);
app.use("/api/students", studentRoter);
app.use("/api/salah", salahRoter);
app.use("/api/klasat", classRoter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.listen(port, ()=>{
     console.log("Backend server is running at port: " + port);
});